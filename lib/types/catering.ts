export interface CateringPackage {
  id: string;
  label?: string;
  category: string;
  people: string;
  price: string;
  image: string;
  details: string[];
}

export interface CateringMenuBlock {
  id: string;
  title: string;
  subtitle: string;
  items: CateringPackage[];
}

/** Per-person add-ons scale with the guest count; flat ones are ordered by the tray. */
export type CateringAddOnUnit = "per_person" | "flat";

export interface CateringAddOn {
  id: string;
  name: string;
  /** Display string, shown on the page exactly as written. */
  price: string;
  unit: CateringAddOnUnit;
  /** `price` as a number — dollars per guest, or per tray for flat add-ons. */
  unitPrice: number;
  image: string;
  /** The menu section this add-on block is rendered after. */
  afterSectionId: string;
}
