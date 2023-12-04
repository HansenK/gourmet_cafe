import { View } from "react-native";

import OrderItem from "../components/history/OrderItem";
import { useOrders } from "../queries/orders";
import ScreenLayout from "./ScreenLayout";
import { ActivityIndicator } from "react-native-paper";

const HistoryScreen = () => {
  const { data: orders = [], isLoading } = useOrders();

  return (
    <ScreenLayout>
      {isLoading && <ActivityIndicator style={{ marginVertical: 20 }} />}
      <View style={{ gap: 10 }}>
        {orders.map((order) => {
          return <OrderItem key={order.id} order={order} />;
        })}
      </View>
    </ScreenLayout>
  );
};

export default HistoryScreen;
