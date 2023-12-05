import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Icon, Text } from "react-native-paper";

import OrderItem from "../components/history/OrderItem";
import { useOrders } from "../queries/orders";
import ScreenLayout from "./ScreenLayout";
import { OrderStatus } from "../types/orders";

const HistoryScreen = () => {
  const { data: orders = [], isLoading, refetch } = useOrders();

  const pastOrders = React.useMemo(() => orders.filter((order) => order.status === OrderStatus.Closed), [orders]);
  const currentOrder = React.useMemo(() => orders.find((order) => order.status === OrderStatus.InProgress), [orders]);

  return (
    <ScreenLayout
      refreshing={isLoading}
      onRefresh={() => {
        refetch();
      }}
    >
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {orders.length === 0 && !isLoading && (
        <View style={{ marginTop: 50, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon source="image-filter-none" size={30} />
          <Text style={{ textAlign: "center" }}>Nenhum pedido encontrado.</Text>
        </View>
      )}

      {!!currentOrder && (
        <View style={{ gap: 10, marginBottom: 10 }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Pedido em andamento:
          </Text>
          <OrderItem key={currentOrder.id} order={currentOrder} />
        </View>
      )}

      {pastOrders.length > 0 && (
        <View style={{ gap: 10 }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Pedidos passados:
          </Text>

          <View style={{ gap: 10, paddingBottom: 20 }}>
            {pastOrders.map((order) => {
              return <OrderItem key={order.id} order={order} />;
            })}
          </View>
        </View>
      )}
    </ScreenLayout>
  );
};

export default HistoryScreen;
