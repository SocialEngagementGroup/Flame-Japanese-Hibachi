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
