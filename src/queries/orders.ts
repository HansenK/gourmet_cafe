import { DefaultError, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import useMe from "../hooks/useMe";
import { OrderWithProducts } from "../types/orders";

export const useOrders = <TData = OrderWithProducts[]>(
  options?: Partial<UseQueryOptions<OrderWithProducts[], DefaultError, TData, ["orders"]>>
) => {
  const { data: me } = useMe();

  return useQuery<OrderWithProducts[], DefaultError, TData, ["orders"]>({
    ...options,
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

export const useFidelityPoints = () => {
  return useOrders({
    select: (orders) => Number(orders.reduce((acc, order) => acc + order.total * 0.1, 0).toFixed(0)),
  });
};
