import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

interface QuantityManagerProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityManager = ({ quantity, setQuantity }: QuantityManagerProps) => {
  const handleDecrement = () => {
    if (quantity <= 0) {
      return setQuantity(0);
    }

    setQuantity(quantity - 1);
  };

  const renderDecrementButton = () => {
    if (quantity <= 1) {
      return <IconButton icon="trash-can" onPress={handleDecrement} iconColor="#663300" size={20} />;
    }

    return (
      <IconButton icon="minus" onPress={() => setQuantity(quantity <= 0 ? 0 : quantity - 1)} iconColor="#663300" size={20} />
    );
  };

  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {renderDecrementButton()}
      <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
        {quantity}
      </Text>
      <IconButton iconColor="#663300" size={20} onPress={() => setQuantity(quantity + 1)} icon="plus" />
    </View>
  );
};

export default QuantityManager;
