"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { findAddOn, maxQtyFor, type QuoteLine } from "@/lib/catering/quote";

type CateringQuoteContextValue = {
  packages: QuoteLine[];
  addons: QuoteLine[];
  open: boolean;
  /** Distinct lines, for the floating bar's badge. */
  lineCount: number;
  /** Adds the package if it isn't already in the quote, then opens the modal. */
  openQuote: (packageId?: string) => void;
  closeQuote: () => void;
  setPackageQty: (id: string, qty: number) => void;
  setAddOnQty: (id: string, qty: number) => void;
  packageQty: (id: string) => number;
  addOnQty: (id: string) => number;
  clear: () => void;
};

const CateringQuoteContext = createContext<CateringQuoteContextValue | null>(
  null,
);

/** Setting a quantity to 0 removes the line rather than leaving a dead entry. */
const withQty = (lines: QuoteLine[], id: string, qty: number): QuoteLine[] => {
  if (qty < 1) return lines.filter((line) => line.id !== id);
  if (lines.some((line) => line.id === id)) {
    return lines.map((line) => (line.id === id ? { ...line, qty } : line));
  }
  return [...lines, { id, qty }];
};

/**
 * Holds the in-progress catering quote.
 *
 * State lives above the cards so a visitor can add packages from several menu
 * sections before opening the modal - the alternative, keeping it inside the
 * modal, forces them to build the whole order in one sitting without being able
 * to scroll back and look at the other menus.
 */
export function CateringQuoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [packages, setPackages] = useState<QuoteLine[]>([]);
  const [addons, setAddons] = useState<QuoteLine[]>([]);
  const [open, setOpen] = useState(false);

  const setPackageQty = useCallback((id: string, qty: number) => {
    setPackages((prev) => withQty(prev, id, Math.min(qty, 99)));
  }, []);

  const setAddOnQty = useCallback((id: string, qty: number) => {
    const addOn = findAddOn(id);
    if (!addOn) return;
    setAddons((prev) => withQty(prev, id, Math.min(qty, maxQtyFor(addOn))));
  }, []);

  const closeQuote = useCallback(() => setOpen(false), []);

  const openQuote = useCallback((packageId?: string) => {
    if (packageId) {
      setPackages((prev) =>
        prev.some((line) => line.id === packageId)
          ? prev
          : [...prev, { id: packageId, qty: 1 }],
      );
    }
    setOpen(true);
  }, []);

  const value = useMemo<CateringQuoteContextValue>(
    () => ({
      packages,
      addons,
      open,
      lineCount: packages.length + addons.length,
      openQuote,
      closeQuote,
      setPackageQty,
      setAddOnQty,
      packageQty: (id) => packages.find((l) => l.id === id)?.qty ?? 0,
      addOnQty: (id) => addons.find((l) => l.id === id)?.qty ?? 0,
      clear: () => {
        setPackages([]);
        setAddons([]);
      },
    }),
    [packages, addons, open, openQuote, closeQuote, setPackageQty, setAddOnQty],
  );

  return (
    <CateringQuoteContext.Provider value={value}>
      {children}
    </CateringQuoteContext.Provider>
  );
}

export function useCateringQuote(): CateringQuoteContextValue {
  const context = useContext(CateringQuoteContext);
  if (!context) {
    throw new Error(
      "useCateringQuote must be used inside a CateringQuoteProvider",
    );
  }
  return context;
}
