import { Database } from "../../database.types";
import { Review } from "./reviews";

export type RawProduct = Database["public"]["Tables"]["products"]["Row"];
export enum ProductType {
  Drink = "drink",
  Food = "food",
}

export interface Product extends RawProduct {
  reviews: Review[];
  averageReview: number;
}
