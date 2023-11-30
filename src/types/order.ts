export interface User {
  id: number;
  full_name: string;
  display_name: string;
  email: string;
  phone_number: string;
  firebase_id: string;
  user_type: string;
  uuid: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  joined_community: number;
  avatar: string | null;
  auth0_id: string | null;
}

export interface Address {
  id: number;
  user_id: number;
  address_line_1: string | null;
  address_line_2: string | null;
  type: string;
  region: string | null;
  city: string | null;
  area: string;
  block: string;
  house: string;
  apartment: string | null;
  floor: string | null;
  street: string;
  additional_directions: string | null;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address_name: string | null;
  phone_number: string;
}

export interface Item {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  currency: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: string;
  address_id: number;
  payment_method: string;
  currency: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
  address: Address;
  items: Item[];
}

export interface OrderDataResponse {
  current_page: number;
  data: Order[];
  total: number;
  // ... other properties
}