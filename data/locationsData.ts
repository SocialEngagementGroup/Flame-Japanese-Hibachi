export interface Location {
  id: number;
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  status?: string;
  openUntil?: string;
  distance?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const activeLocations: Location[] = [
  {
    id: 1,
    name: "Baltimore, MD",
    address: "5230 Moravia Rd, Suite B, Baltimore, MD 21206",
    phone: "+1 410-858-4910",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 39.32378, lng: -76.54919 },
  },
  {
    id: 2,
    name: "Manassas, VA",
    address: "9522 Liberia Ave, Manassas, VA 20110",
    phone: "+1 703-789-8289",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 38.74620, lng: -77.46467 },
  },
  {
    id: 3,
    name: "Laurel, MD",
    address: "13600 Baltimore Ave #310, Laurel, MD 20707",
    phone: "+1 240-360-5080",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 39.09015, lng: -76.84883 },
  },
  {
    id: 4,
    name: "Pasadena, MD",
    address: "8036 Ritchie Hwy, Suite 1-C, Pasadena, MD 21122",
    phone: "+1 443-628-6850",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 39.11739, lng: -76.58169 },
  },
  {
    id: 5,
    name: "Alexandria, VA",
    address: "6676 Richmond Hwy, Alexandria, VA 22306",
    phone: "+1 571-683-3199",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 38.77583, lng: -77.08638 },
  },
  {
    id: 6,
    name: "Forest Hill (Richmond), VA",
    address: "7037 Forest Hill Avenue, Suite B, Richmond, VA 23225",
    phone: "+1 804-997-7009",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 37.52550, lng: -77.48197 },
  },
  {
    id: 7,
    name: "Tamarac, FL",
    address: "5707 University Dr, Tamarac, FL 33321",
    phone: "+1 954-953-8848",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 26.2235, lng: -80.2520 },
  },
  {
    id: 8,
    name: "Seven Corners, VA",
    address: "6379 Seven Corners Center, VA 22044",
    phone: "+1 571-480-5161",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 38.8655, lng: -77.1448 },
  },
  {
    id: 9,
    name: "Northern Pkwy (Baltimore), MD",
    address: "4460 W Northern Parkway, Baltimore, MD 21215",
    phone: "+1 410-801-8279",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 39.3495, lng: -76.6850 },
  },
  {
    id: 10,
    name: "Philadelphia, PA",
    address: "101 E Olney Avenue, Philadelphia, PA 19120",
    phone: "+1 215-344-6444",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 40.0353, lng: -75.1217 },
  },
  {
    id: 11,
    name: "Royal Palm Beach, FL",
    address: "9940 Belvedere Rd #F, Royal Palm Beach, FL 33411",
    phone: "+1 561-766-1038",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 26.6912, lng: -80.1988 },
  },
  {
    id: 12,
    name: "Aberdeen, MD",
    address: "939 Beards Hill Rd, Aberdeen, MD 21001",
    phone: "+1 443-327-8349",
    hours: "Mon–Sat 11AM–10PM / Sun 11AM–9PM",
    coordinates: { lat: 39.5085, lng: -76.1712 },
  },
];

export const comingSoonLocations: Location[] = [
  {
    id: 101,
    name: "Miami, FL",
    address: "11195 SW 216th St, Miami, FL 33170",
    status: "Coming Soon",
    openUntil: "11 PM",
    distance: "2.4 MILES AWAY",
    coordinates: { lat: 25.5539, lng: -80.3752 },
  },
  {
    id: 102,
    name: "Marlow Heights, MD",
    address: "4620 St Barnabas Rd, Suite #B, Marlow Heights, MD 20748",
    status: "Coming Soon",
    openUntil: "10 PM",
    distance: "4.8 MILES AWAY",
    coordinates: { lat: 38.8252, lng: -76.9317 },
  },
  {
    id: 103,
    name: "Norfolk, VA",
    address: "5802 E Virginia Blvd, Space #130, Norfolk, VA 23502",
    status: "Coming Soon",
    openUntil: "11 PM",
    distance: "5.2 MILES AWAY",
    coordinates: { lat: 36.8584, lng: -76.2070 },
  },
  {
    id: 104,
    name: "Mechanicsville, VA",
    address: "7354 Bell Creek Rd, Mechanicsville, VA 23111",
    status: "Coming Soon",
    openUntil: "10 PM",
    distance: "1.5 MILES AWAY",
    coordinates: { lat: 37.6433, lng: -77.3486 },
  },
  {
    id: 105,
    name: "Bristow, VA",
    address: "10286 Bristow Center Dr, Bristow, VA 20136",
    status: "Coming Soon",
    openUntil: "11 PM",
    distance: "3.7 MILES AWAY",
    coordinates: { lat: 38.7423, lng: -77.5855 },
  },
  {
    id: 106,
    name: "Bowie, MD",
    address: "3548 Crain Highway, Bowie, MD 20716",
    status: "Coming Soon",
    openUntil: "11 PM",
    distance: "2.9 MILES AWAY",
    coordinates: { lat: 38.9329, lng: -76.7126 },
  },
  {
    id: 107,
    name: "Coral Springs, FL",
    address: "6291 West Sample Rd, Coral Springs, FL 33067",
    status: "Coming Soon",
    openUntil: "10 PM",
    distance: "6.1 MILES AWAY",
    coordinates: { lat: 26.2755, lng: -80.2520 },
  },
  {
    id: 108,
    name: "Fredericksburg, VA",
    address: "5711 Plank Rd, Fredericksburg, VA 22407",
    status: "Coming Soon",
    openUntil: "11 PM",
    distance: "4.2 MILES AWAY",
    coordinates: { lat: 38.2721, lng: -77.5583 },
  },
  {
    id: 109,
    name: "Accokeek, MD",
    address: "7045C Berry Road, Accokeek, MD 20607",
    status: "Coming Soon",
    openUntil: "10 PM",
    distance: "3.3 MILES AWAY",
    coordinates: { lat: 38.6723, lng: -76.9859 },
  },
];
