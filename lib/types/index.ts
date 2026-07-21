export type Location = {
  id: number;
  slug: string;
  name: string;
  schemaName: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  image?: string;
  /** Per-store order.online URL. Falls back to lib/constants.ts ORDER_URL when unset/empty. */
  orderUrl?: string;
};

export type ComingSoonLocation = {
  id: number;
  name: string;
  address: string;
  status: string;
  openUntil: string;
  distance: string;
};

export * from "./catering";
export * from "./menu";
