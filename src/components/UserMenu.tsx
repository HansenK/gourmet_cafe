import React from "react";
import { IconButton, Menu, Text, Divider } from "react-native-paper";
import { View } from "react-native";

import useMe from "../hooks/useMe";

const UserMenu = () => {
  const { data: me } = useMe();

  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Menu
      visible={openMenu}
      onDismiss={() => setOpenMenu(false)}
      anchor={<IconButton icon="account-circle" size={28} onPress={() => setOpenMenu(true)} />}
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: "white" }}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{me?.user_metadata.name}</Text>
        <Text style={{ fontStyle: "italic" }}>{me?.email}</Text>
      </View>

      <Divider />

      <Menu.Item onPress={() => {}} title="Configurações" leadingIcon="cog" />
    </Menu>
  );
};

export default UserMenu;
