import React from 'react';

export interface ServiceItem {
  id: number | string;
  name: string;
  price: string;
  duration?: string;
  note?: string;
}

export interface CartItem extends ServiceItem {
  quantity: number;
}

export interface ServiceSubCategory {
  title: string;
  items: ServiceItem[];
}

export interface ServiceCategory {
  title: string;
  subCategories: ServiceSubCategory[];
}

export interface ProductPrice {
    size: string;
    price: string;
    tag?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  categoryId: string;
  prices: ProductPrice[];
  description: string;
  activeComponents: string[];
  releaseForm: string;
}