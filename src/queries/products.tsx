import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import { ProductType, Product } from "../types/products";

interface UseProductsProps<TData = Product[]> {
  type?: ProductType;
  options?: Partial<UseQueryOptions<Product[], unknown, TData, ["products", ProductType | undefined]>>;
}

const DEFAULT_PRODUCTS: Product[] = [];

export const useProducts = <TData extends Product[]>(props?: UseProductsProps<TData>) => {
  const { type, options } = props || {};

  return useQuery<Product[], unknown, TData, ["products", ProductType | undefined]>({
    ...options,
    queryKey: ["products", type],
    queryFn: async () => {
      let query = supabase.from("products").select(`*, reviews(*)`);

      if (type) {
        query = query.eq("type", type);
      }

      return query.then((res) => {
        if (!res.data) return DEFAULT_PRODUCTS;

        return res.data.map((product) => {
          const averageReview = (() => {
            const sum = product.reviews.reduce((acc, review) => acc + review.stars, 0);

            return sum / product.reviews.length;
          })();

          return {
            ...product,
            averageReview,
          };
        });
      });
    },
  });
};
