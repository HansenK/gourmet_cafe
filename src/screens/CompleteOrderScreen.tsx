import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RadioButton, Text, Button, TextInput } from "react-native-paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { View, ActivityIndicator } from "react-native";

import ScreenLayout from "./ScreenLayout";
import { CartProduct, useCart } from "../contexts/CartContext";
import { supabase } from "../lib/supabase";
import useMe from "../hooks/useMe";

const CARD_OPTIONS = [
  { id: 1, cardNumber: "**** **** **** 3456", flag: "visa", type: "credit" },
  { id: 2, cardNumber: "**** **** **** 3124", flag: "mastercard", type: "debit" },
];

const ADDRESS_OPTIONS = [
  { id: 1, address: "Rua dos Bobos, 0" },
  { id: 2, address: "Av. Brasil, 0" },
];

const CompleteOrderScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: me } = useMe();
  const { cart, clearCart, getTotalPrice } = useCart();

  const [selectedCardId, setSelectedCardId] = React.useState<number | null>(1);
  const [selectedAddressId, setSelectedAddressId] = React.useState<number | null>(1);
  const [discoutCode, setDiscountCode] = React.useState<string>("");

  const { mutate: createOrder, isPending: isSubmitting } = useMutation({
    mutationFn: async (cartProducts: CartProduct[]) => {
      const totalPrice = getTotalPrice();

      const newOrderId = await supabase
        .from("orders")
        .insert({ user_id: me?.id!, total: totalPrice })
        .select("id")
        .single()
        .then((res) => res.data?.id);

      if (!newOrderId) return;

      const newOrderProducts = cartProducts.map((cartProduct) => ({
        order_id: newOrderId,
        product_id: cartProduct.product.id,
        quantity: cartProduct.quantity,
      }));

      return supabase
        .from("orders_products")
        .insert(newOrderProducts)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      clearCart();
      navigation.navigate("App");
    },
  });

  return (
    <ScreenLayout>
      <View style={{ gap: 15 }}>
        <View>
          <Text variant="titleMedium">Método de pagamento</Text>
          <RadioButton.Group onValueChange={(value) => setSelectedCardId(Number(value))} value={String(selectedCardId)}>
            {CARD_OPTIONS.map((cardOption) => (
              <View key={cardOption.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value={String(cardOption.id)} />
                <Text>{cardOption.cardNumber}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <View>
          <Text variant="titleMedium">Endereço de entrega</Text>
          <RadioButton.Group onValueChange={(value) => setSelectedAddressId(Number(value))} value={String(selectedAddressId)}>
            {ADDRESS_OPTIONS.map((addressOption) => (
              <View key={addressOption.id} style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value={String(addressOption.id)} />
                <Text>{addressOption.address}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <TextInput
          mode="outlined"
          label="Cupom de desconto"
          value={discoutCode}
          onChange={(e) => setDiscountCode(e.nativeEvent.text)}
        />

        <Button
          disabled={isSubmitting}
          mode="contained"
          onPress={() => createOrder(cart)}
          icon="check"
          textColor={isSubmitting ? "gray" : "white"}
        >
          <Text style={{ color: isSubmitting ? "gray" : "white" }}>{isSubmitting ? "Carregando..." : "Finalizar pedido"}</Text>
        </Button>
      </View>
    </ScreenLayout>
  );
};

export default CompleteOrderScreen;
