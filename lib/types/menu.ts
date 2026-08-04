export interface MenuItem {
  id: string;
  name: string;
  /** Dollars, without the sign - e.g. "11.85". */
  price: string;
  tag: string;
  image: string;
  subCategory?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
}
