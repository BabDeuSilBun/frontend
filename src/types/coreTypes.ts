import { Address, ImageType, ItemType, Response } from './types';

// Address interfaces
interface DeliveryAddress {
  deliveredPostal: string;
  deliveredStreetAddress: string;
  deliveredDetailAddress: string;
}

interface MetAddress {
  metPostal: string;
  metStreetAddress: string;
  metDetailAddress: string;
}

// Common interface for shared fields across different types
export interface CommonType {
  storeId: number;
  image: ImageType[];
  deliveryTimeRange: string;
  category: string;
}

// Restaurant type definition
export interface RestaurantType extends CommonType {
  address?: Address;
  closeTime?: string;
  deliveryPrice: number;
  description?: string;
  entrepreneurId?: number;
  minPurchasePrice: number;
  name: string;
  openTime?: string;
  phoneNumber?: string;
  dayOfWeek?: string;
}

// Meeting type definition
export interface MeetingType extends CommonType {
  meetingId: number;
  storeName: string;
  purchaseType: 'DINING_TOGETHER' | 'DELIVERY_TOGETHER';
  participantMin?: number;
  participantMax: number;
  isEarlyPaymentAvailable?: boolean;
  paymentAvailableAt: string;
  deliveryAddress?: DeliveryAddress;
  metAddress?: MetAddress;
  deliveredAt?: string;
  deliveryFee?: number;
  deliveryFeeRange: string;
  status:
    | 'GATHERING'
    | 'PURCHASE_COMPLETED'
    | 'PURCHASE_CANCELLED'
    | 'COOKING'
    | 'COOKING_COMPLETED'
    | 'IN_DELIVERY'
    | 'DELIVERY_COMPLETED'
    | 'MEETING_CANCELLED'
    | 'MEETING_COMPLETED';
  description?: string;
}

// Restaurant type definition
export interface CategoryType {
  categoryId: number;
  name: string;
}

// Menu type definition
export interface MenuType {
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

// Team menu type definition
export interface TeamPurchaseType {
  totalFee: number;
  items: ItemType[];
}

// Individual order type definition
export interface IndividualPurchaseType {
  totalFee: number;
  items: ItemType[];
}

export interface RestaurantsResponse extends Response {
  content: RestaurantType[];
}

export interface CategoriesResponse extends Response {
  content: CategoryType[];
}

export interface MenusResponse extends Response {
  content: MenuType[];
  storeId: number;
}

export interface MeetingsResponse extends Response {
  content: MeetingType[];
}

export interface TeamPurchasesResponse extends Response {
  content: TeamPurchaseType[];
}

export interface IndividualPurchasesResponse extends Response {
  content: IndividualPurchaseType[];
}
