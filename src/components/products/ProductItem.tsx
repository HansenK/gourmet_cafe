import React from "react";
import { Image, Pressable, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { Product } from "../../types/products";
import ProductDetailModal from "../ProductDetailModal";

interface ProductItemProps {
  product: Product;
  right?: React.ReactNode;
}

const ProductItem = ({ product, right = null }: ProductItemProps) => {
  const [openDetails, setOpenDetails] = React.useState(false);

  return (
    <>
      <Pressable onPress={() => setOpenDetails(true)}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderColor: "grey",
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: product.imageSrc! }}
            style={{ width: 80, height: 80, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
          />

          <View style={{ padding: 5, flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={1} style={{ fontWeight: "bold" }}>
              {product.name}
            </Text>
            <Text variant="bodySmall" numberOfLines={2}>
              {product.description}
            </Text>
          </View>

          {right}
        </View>
      </Pressable>

      <ProductDetailModal product={product} visible={openDetails} hideModal={() => setOpenDetails(false)} />
    </>
  );
};

export default ProductItem;
