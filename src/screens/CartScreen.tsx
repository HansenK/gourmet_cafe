import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ScreenLayout from "./ScreenLayout";
import { useCart } from "../contexts/CartContext";
import ProductItem from "../components/products/ProductItem";
import QuantityManager from "../components/cart/QuantityManager";

const CartScreen = () => {
  const navigation = useNavigation();

  const { cart, updateProductQuantity, removeFromCart, getTotalPrice } = useCart();
  const cartIsEmpty = cart.length === 0;

  return (
    <ScreenLayout>
      <View style={{ gap: 15 }}>
        {!cartIsEmpty && (
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Seu carrinho
          </Text>
        )}

        {cartIsEmpty && (
          <View style={{ justifyContent: "center", flexDirection: "column", marginTop: 50, alignItems: "center", gap: 10 }}>
            <Icon source="cart-off" size={50} />
            <Text>Nenhum produto adicionado ao carrinho.</Text>
          </View>
        )}

        <ScrollView>
          <View style={{ gap: 10 }}>
            {cart.map((cartProduct) => (
              <ProductItem
                key={cartProduct.product.id}
                product={cartProduct.product}
                right={
                  <QuantityManager
                    quantity={cartProduct.quantity}
                    setQuantity={(quantity) => {
                      if (quantity <= 0) {
                        return removeFromCart(cartProduct);
                      }

                      updateProductQuantity(cartProduct, quantity);
                    }}
                  />
                }
              />
            ))}
          </View>
        </ScrollView>

        {!cartIsEmpty && (
          <>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ fontWeight: "bold" }}>Total: </Text>
              <Text style={{ color: "green" }}>R$ {getTotalPrice().toFixed(2).replace(".", ",")}</Text>
            </View>

            <Button mode="contained" onPress={() => navigation.navigate("CompleteOrderScreen")}>
              <Text style={{ color: "white" }}>Realizar pedido</Text>
            </Button>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default CartScreen;
