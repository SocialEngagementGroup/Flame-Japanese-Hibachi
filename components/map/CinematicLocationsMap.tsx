"use client";

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { activeLocations, comingSoonLocations, Location as ProjectLocation } from '@/data/locationsData';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

// Leaflet configuration for Next.js
// Fix default icon issues
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  id: string | number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  phone: string;
  isComingSoon?: boolean;
}

const mapProjectLocationToMapLocation = (loc: ProjectLocation): Location => ({
  id: loc.id,
  name: loc.name,
  address: loc.address,
  lat: loc.coordinates.lat,
  lng: loc.coordinates.lng,
  hours: loc.hours || 'Opening Soon',
  phone: loc.phone || 'N/A',
  isComingSoon: !!loc.status,
});

const PROJECT_LOCATIONS = [
  ...activeLocations.map(mapProjectLocationToMapLocation),
  ...comingSoonLocations.map(mapProjectLocationToMapLocation),
];

const USA_CENTER: [number, number] = [39.8283, -98.5795];
const USA_ZOOM = 5;

export interface CinematicMapRef {
  flyToLocation: (id: number | string) => void;
  resetView: () => void;
}

const CinematicLocationsMap = forwardRef<CinematicMapRef, { 
  height?: string; 
  initialLocationId?: number | string;
  showUI?: boolean;
}>(({ height = '100vh', initialLocationId, showUI = true }, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<{ [key: string]: L.Marker }>({});
  const [isFlying, setIsFlying] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);
  const [progress, setProgress] = useState(0);

  // Imperative API
  useImperativeHandle(ref, () => ({
    flyToLocation: (id: number | string) => {
      const loc = PROJECT_LOCATIONS.find(l => l.id === id);
      if (loc) {
        flyToLocation(loc);
      }
    },
    resetView: () => {
      if (map.current) {
        map.current.flyTo(USA_CENTER, USA_ZOOM, {
          duration: 2,
          easeLinearity: 0.25,
        });
        setSelectedLoc(null);
      }
    }
  }), [isFlying]);

  // Smooth Native FlyTo Transition
  const flyToLocation = useCallback((location: Location) => {
    if (!map.current || isFlying) return;

    setIsFlying(true);
    setProgress(0);
    setSelectedLoc(location);

    // Stage 1: Fly to USA Overview for context
    map.current.flyTo(USA_CENTER, USA_ZOOM, {
      duration: 1.5,
      easeLinearity: 0.25,
    });

    // Stage 2: Dive into the target location
    setTimeout(() => {
      if (!map.current) return;
      
      map.current.flyTo([location.lat, location.lng], 13, {
        duration: 2.5,
        easeLinearity: 0.2,
      });

      // Update progress for HUD effect
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsFlying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

    }, 1200); // Slight overlap with Stage 1 for fluid arc
  }, [isFlying]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Create map centered on USA
    map.current = L.map(mapContainer.current, {
      center: USA_CENTER,
      zoom: USA_ZOOM,
      zoomControl: false,
      attributionControl: false,
      minZoom: 4,
    });

    // Satellite imagery with noWrap to prevent tiling issues
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      noWrap: true,
    }).addTo(map.current);

    // Custom Red Pin Icon
    const redPinIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-red-600/30 rounded-full animate-ping"></div>
          <div class="relative w-4 h-4 bg-red-600 border-2 border-white rounded-full shadow-lg"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add markers
    PROJECT_LOCATIONS.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng], { icon: redPinIcon })
        .addTo(map.current!)
        .on('click', () => flyToLocation(loc));
      
      markers.current[loc.id] = marker;
    });

    // Initial view
    if (initialLocationId) {
      const startLoc = PROJECT_LOCATIONS.find(l => l.id === initialLocationId);
      if (startLoc) flyToLocation(startLoc);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full grayscale-[20%] brightness-[80%] contrast-[110%]" />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* HUD UI */}
        {showUI && (
          <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-lg flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="p-2 bg-red-600 rounded-lg">
                <Navigation className={`w-5 h-5 text-white ${isFlying ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Status</div>
                <div className="text-sm text-white font-medium">
                  {isFlying ? 'FLIGHT IN PROGRESS' : selectedLoc ? 'LOCATION SECURED' : 'USA OVERVIEW'}
                </div>
              </div>
            </div>

            {selectedLoc && (
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-lg animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold mb-1">Target</div>
                <div className="text-lg text-white font-bold leading-none mb-2">{selectedLoc.name}</div>
                <div className="flex flex-col gap-1 text-[11px] text-white/70">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {selectedLoc.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" /> {selectedLoc.phone}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
      </div>

      {/* Flight Progress Bar */}
      {isFlying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <style jsx global>{`
        .leaflet-container {
          background: #0a0a0a !important;
        }
        .leaflet-tile-pane {
          filter: saturate(1.2) brightness(0.9) contrast(1.1);
        }
      `}</style>
    </div>
  );
});

CinematicLocationsMap.displayName = 'CinematicLocationsMap';

export default CinematicLocationsMap;
