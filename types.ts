export interface ServiceItem {
  name: string;
  price: string;
  duration?: string;
}

export interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

export interface ProductPrice {
    size: string;
    price: string;
    tag?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  prices: ProductPrice[];
  description: string;
  activeComponents: string[];
  releaseForm: string;
}