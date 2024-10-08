import { Address, ImageType, ItemType, Response } from './types';

// Address interfaces
interface DeliveryAddress {
  deliveryPostal: string;
  deliveryStreetAddress: string;
  deliveryDetailAddress: string;
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
export interface MeetingType {
  meetingId: number;
  storeId: number;
  storeName: string;
  storeImage: ImageType[];
  purchaseType: 'DINING_TOGETHER' | 'DELIVERY_TOGETHER';
  participantMin: number;
  participantMax: number;
  isEarlyPaymentAvailable?: boolean;
  paymentAvailableAt: string;
  deliveryAddress?: DeliveryAddress;
  metAddress?: MetAddress;
  deliveryFeeRange: string;
  deliveredAt?: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  deliveryTimeRange: string;
  minPurchaseAmount: number;
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
  category: string;
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

// Post team purchase type definition
export interface PostTeamPurchaseType {
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

// Post individual purchase type definition
export interface PostIndividualPurchaseType {
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Holiday {
  dayOfWeek: string;
  holidayId: number;
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

export interface PostTeamPurchasesResponse extends Response {
  content: PostTeamPurchaseType[];
}

export interface PostIndividualPurchasesResponse extends Response {
  content: PostIndividualPurchaseType[];
}

export interface PurchasesResponse {
  totalFee: number;
  items: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: ItemType[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

export interface StoreImagesResponse {
  content: ImageType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface HolidaysResponse {
  content: Holiday[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}
