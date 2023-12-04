import { Link } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { Product } from "../../types/products";
import ProductCard from "../ProductCard";
import { MOCKED_PRODUCTS } from "../../utils/products";

const MorePopularProducts = () => {
  // TBD: Fetch popular products from API
  const popularProducts: Product[] = MOCKED_PRODUCTS;

  return (
    <View style={{ gap: 10 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
          Mais populares
        </Text>

        <Link to="/products" style={{ textDecorationLine: "underline" }}>
          Ver todos...
        </Link>
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
