import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Chip, ActivityIndicator, Icon } from "react-native-paper";

import ScreenLayout from "./ScreenLayout";
import ProductItem from "../components/products/ProductItem";
import { Product, ProductType } from "../types/products";
import { useProducts } from "../queries/products";

const DEFAULT_PRODUCTS: Product[] = [];
const FILTERS = [
  { icon: "food", label: "Comidas", value: ProductType.Food },
  { icon: "coffee", label: "Bebidas", value: ProductType.Drink },
];

const ProductsScreen = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<ProductType>();

  const {
    data: products = DEFAULT_PRODUCTS,
    isLoading,
    isFetched,
  } = useProducts({
    type: selectedFilter,
  });

  return (
    <ScreenLayout>
      <View style={{ gap: 10 }}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          Todos os produtos
        </Text>

        {products.length === 0 && isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}

        {isFetched && (
          <ScrollView horizontal>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              {FILTERS.map((filter) => {
                const isSelected = filter.value === selectedFilter;

                return (
                  <Chip
                    key={filter.value}
                    selected={isSelected}
                    icon={filter.icon}
                    onPress={() => setSelectedFilter(selectedFilter === filter.value ? undefined : filter.value)}
                    style={{ backgroundColor: isSelected ? "#C7B5A3" : undefined }}
                    mode={isSelected ? "flat" : "outlined"}
                  >
                    <Text>{filter.label}</Text>
                  </Chip>
                );
              })}
            </View>
          </ScrollView>
        )}

        {products.length === 0 && !isLoading && (
          <View style={{ marginTop: 50, alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Icon source="image-filter-none" size={30} />
            <Text style={{ textAlign: "center" }}>Nenhum produto encontrado.</Text>
          </View>
        )}

        <ScrollView>
          <View style={{ gap: 10, display: "flex", marginTop: 10 }}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default ProductsScreen;
