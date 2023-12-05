import { ScrollView, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

import ProductCard from "../ProductCard";
import { useProducts } from "../../queries/products";

const MorePopularProducts = () => {
  const { data: popularProducts = [], isLoading } = useProducts();

  return (
    <View style={{ gap: 10 }}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
          Mais populares
        </Text>

        {isLoading && <ActivityIndicator size={15} />}
      </View>

      <ScrollView horizontal>
        <View style={{ gap: 10, display: "flex", flexDirection: "row" }}>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MorePopularProducts;
