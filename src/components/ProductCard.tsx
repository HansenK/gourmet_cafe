import React from "react";
import { Card, Text } from "react-native-paper";

import { Product } from "../types/products";
import ProductDetailModal from "./ProductDetailModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [openDetails, setOpenDetails] = React.useState(false);

  return (
    <>
      <Card mode="outlined" style={{ width: 200 }} onPress={() => setOpenDetails(true)}>
        <Card.Cover
          source={{ uri: product.imageSrc || undefined }}
          style={{ height: 120, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />
        <Card.Title
          titleVariant="titleMedium"
          title={product.name}
          titleStyle={{ fontWeight: "bold" }}
          subtitle={`R$ ${product.price}`.replace(".", ",")}
          subtitleStyle={{ color: "green" }}
          rightStyle={{ paddingRight: 10 }}
        />
        <Card.Content>
          <Text variant="bodyMedium" numberOfLines={3}>
            {product.description}
          </Text>
        </Card.Content>
      </Card>

      <ProductDetailModal product={product} visible={openDetails} hideModal={() => setOpenDetails(false)} />
    </>
  );
};

export default ProductCard;
