import { ScrollView, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

import ProductCard from "../ProductCard";
import { useOrders } from "../../queries/orders";
import { useProducts } from "../../queries/products";

const RecentProducts = () => {
  const { data: orders = [], isLoading } = useOrders();
  const { data: recentProducts = [] } = useProducts({
    options: {
      select: (products) => {
        return products.filter((product) => {
          return orders.some((order) => order.products.some((orderProduct) => orderProduct.product?.id === product.id));
        });
      },
      enabled: orders.length > 0,
    },
  });

  return (
    <View style={{ gap: 10 }}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
          Peça novamente
        </Text>

        {isLoading && <ActivityIndicator size={15} />}
      </View>

      <ScrollView horizontal>
        <View style={{ gap: 10, display: "flex", flexDirection: "row" }}>
          {recentProducts.map((product) => (
            // TBD: Fix type
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentProducts;
