import { View } from "react-native";
import { ActivityIndicator, Icon, Text } from "react-native-paper";

import OrderItem from "../components/history/OrderItem";
import { useOrders } from "../queries/orders";
import ScreenLayout from "./ScreenLayout";

const HistoryScreen = () => {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <ScreenLayout>
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}

      {orders.length === 0 && !isLoading && (
        <View style={{ marginTop: 50, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon source="image-filter-none" size={30} />
          <Text style={{ textAlign: "center" }}>Nenhum pedido encontrado.</Text>
        </View>
      )}

      <View style={{ gap: 10 }}>
        {orders.map((order) => {
          return <OrderItem key={order.id} order={order} />;
        })}
      </View>
    </ScreenLayout>
  );
};

export default HistoryScreen;