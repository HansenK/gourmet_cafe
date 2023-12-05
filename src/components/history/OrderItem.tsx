import { View } from "react-native";
import { Text, List } from "react-native-paper";

import { OrderStatus, OrderWithProducts } from "../../types/orders";
import { format } from "date-fns";

interface OrderItemProps {
  order: OrderWithProducts;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <View style={{ backgroundColor: "white", padding: 10, borderColor: "gray", borderWidth: 1, borderRadius: 10 }}>
      {order.status !== OrderStatus.InProgress && (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Data: </Text>
          <Text variant="titleSmall">{format(new Date(order.created_at), "dd/MM/yyyy - HH:mm:ss")}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Total: </Text>
        <Text variant="titleSmall" style={{ color: "darkred" }}>
          R$ {order.total.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <List.Section>
        {order.products.map((orderProduct) => (
          <List.Item
            key={orderProduct.product?.id}
            title={() => (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>{`${orderProduct.quantity}x `}</Text>
                <Text>{`${orderProduct.product?.name}`}</Text>
              </View>
            )}
            style={{ paddingVertical: 0 }}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default OrderItem;
