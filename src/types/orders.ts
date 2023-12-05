import { Database } from "../../database.types";
import { RawProduct } from "./products";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderProduct = Database["public"]["Tables"]["orders_products"]["Row"];
export enum OrderStatus {
  InProgress = "in_progress",
  Closed = "closed",
}

export interface OrderWithProducts extends Order {
  products: {
    quantity: OrderProduct["quantity"];
    product: RawProduct | null;
  }[];
}

