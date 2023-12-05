import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Badge, IconButton } from "react-native-paper";

import { useCart } from "../contexts/CartContext";
import UserMenu from "./UserMenu";

const HeaderActions = () => {
  const navigation = useNavigation();
  const { cart } = useCart();

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View>
        {/* TBD: Fix typescript */}
        <IconButton icon="cart" size={28} onPress={() => navigation.navigate("Cart")} />
        {cart.length > 0 && (
          <Badge style={{ position: "absolute", top: 8, right: 8 }} size={15}>
            {cart.length}
          </Badge>
        )}
      </View>
      <UserMenu />
    </View>
  );
};

export default HeaderActions;
