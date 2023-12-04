import { Image, View } from "react-native";
import { Text } from "react-native-paper";

const CuriosityOfTheDay = () => {
  return (
    <View style={{ gap: 10, paddingBottom: 15 }}>
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        Curiosidade do dia
      </Text>

      <Image source={{ uri: "https://picsum.photos/700" }} style={{ height: 200, borderRadius: 10 }} />

      <Text numberOfLines={5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </View>
  );
};

export default CuriosityOfTheDay;
