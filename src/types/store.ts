import { Image } from './types';

export interface StoreSummary {
  storeId: number;
  name: string;
  image: Image[];
  deliveryTime: string;
  deliveryPrice: number;
  minOrderPrice: number;
}

export interface StoreDetail extends StoreSummary {
  entrepreneur_id: number;
  description: string;
  postal: string;
  streetAddress: string;
  detailAddress: string;
  phoneNumber: string;
  openTime: string;
  closeTime: string;
}
