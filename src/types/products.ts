import { Database } from "../../database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export enum ProductType {
  Drink = "drink",
  Food = "food",
}
