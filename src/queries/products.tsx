import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import { Product, ProductType } from "../types/products";

interface UseProductsProps {
  type?: ProductType;
}

const DEFAULT_PRODUCTS: Product[] = [];

export const useProducts = (props?: UseProductsProps) => {
  const { type } = props || {};

  return useQuery({
    queryKey: ["products", type],
    queryFn: async () => {
      let query = supabase.from("products").select();

      if (type) {
        query = query.eq("type", type);
      }

      return query.then((res) => res.data || DEFAULT_PRODUCTS);
    },
  });
};
