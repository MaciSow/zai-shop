export interface CartItem {
  id: string;
  price: number;
  title: string;
  count: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}
