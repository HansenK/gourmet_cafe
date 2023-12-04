import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import useMe from "../hooks/useMe";
import { OrderWithProducts } from "../types/orders";

export const useOrders = () => {
  const { data: me } = useMe();

  return useQuery<OrderWithProducts[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      return supabase
        .from("orders")
        .select(
          `
          *,
          products:orders_products(quantity, product:products(*))
        `
        )
        .eq("user_id", me!.id)
        .order("created_at", { ascending: false })
        .then((res) => res.data || []);
    },
    enabled: Boolean(me),
  });
};
