import { Database } from "../../database.types";
import { Product } from "./products";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderProduct = Database["public"]["Tables"]["orders_products"]["Row"];

export interface OrderWithProducts extends Order {
  products: {
    quantity: OrderProduct["quantity"];
    product: Product | null;
  }[];
}
