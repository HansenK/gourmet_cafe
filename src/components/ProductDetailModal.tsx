import React from "react";
import { Card, Modal, Portal, Text, Divider, List, IconButton, Button, Icon } from "react-native-paper";
import { ScrollView, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useCart } from "../contexts/CartContext";
import { Product } from "../types/products";

interface ProductDetailModalProps {
  product: Product;
  visible: boolean;
  hideModal: () => void;
}

const ProductDetailModal = ({ product, visible, hideModal }: ProductDetailModalProps) => {
  const { addToCart, cart } = useCart();

  const isProductInCart = cart.some((cartProduct) => cartProduct.product.id === product.id);

  const shouldDisplayIngredients = product.ingredients && product.ingredients.length > 0;

  if (!visible) return null;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} style={{ padding: 20 }}>
        <Card mode="outlined">
          <Card.Cover
            source={{ uri: product.imageSrc || undefined }}
            style={{ height: 200, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          />

          <Card.Title
            title={product.name}
            titleStyle={{ fontWeight: "bold" }}
            subtitle={`R$ ${product.price.toFixed(2)}`.replace(".", ",")}
            subtitleStyle={{ color: "green" }}
            rightStyle={{ paddingRight: 10 }}
          />

          <Card.Content style={{ height: 300 }}>
            <Button
              mode="contained"
              style={{ marginVertical: 10 }}
              onPress={() => {
                addToCart(product);
              }}
              disabled={isProductInCart}
              icon="cart-plus"
              textColor={isProductInCart ? "gray" : "white"}
            >
              <Text style={{ color: isProductInCart ? "gray" : "white" }}>Adicionar ao carrinho!</Text>
            </Button>
            <ScrollView>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontWeight: "bold" }}>{"( Avaliação: "}</Text>
                <Text style={{ fontWeight: "bold", marginLeft: 2 }}>{product.averageReview}/5</Text>
                <Icon source="star" size={15} color="orange" />
                <Text style={{ fontWeight: "bold" }}>{")"}</Text>
              </View>

              <Text variant="bodyMedium">{product.description}</Text>

              <Divider bold style={{ marginVertical: 20 }} />

              {shouldDisplayIngredients && (
                <View>
                  <Text variant="titleMedium">Ingredientes</Text>

                  <List.Section>
                    {product.ingredients!.map((ingredient) => (
                      <List.Item
                        key={ingredient}
                        title={ingredient}
                        left={() => <MaterialCommunityIcons name="check-circle-outline" color="green" size={20} />}
                        style={{ paddingVertical: 0 }}
                      />
                    ))}
                  </List.Section>
                </View>
              )}
            </ScrollView>
          </Card.Content>

          <IconButton
            icon="close-circle-outline"
            iconColor="white"
            style={{ position: "absolute", top: 0, right: 0 }}
            onPress={hideModal}
          />
        </Card>
      </Modal>
    </Portal>
  );
};

export default ProductDetailModal;
