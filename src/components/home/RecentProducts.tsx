import { ScrollView, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { uniqBy } from "lodash";

import ProductCard from "../ProductCard";
import { useOrders } from "../../queries/orders";
import { Product } from "../../types/products";

const RecentProducts = () => {
  const { data: recentProducts = [], isLoading } = useOrders<Product[]>({
    select: (orders) => {
      const allProducts: Product[] = orders
        .map((order) => order.products)
        .flat()
        .map((cartProduct) => cartProduct.product!);

      return uniqBy<Product>(allProducts, "id");
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
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentProducts;
