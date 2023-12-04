import { View } from "react-native";
import { Divider } from "react-native-paper";

import ScreenLayout from "./ScreenLayout";
import MorePopularProducts from "../components/home/MorePupularProducts";
import RecentProducts from "../components/home/RecentProducts";
import CuriosityOfTheDay from "../components/home/CuriosityOfTheDay";

const HomeScreen = () => {
  return (
    <ScreenLayout>
      <View style={{ gap: 20 }}>
        <MorePopularProducts />
        <RecentProducts />
      </View>

      <Divider style={{ marginTop: 20, marginBottom: 20 }} bold />

      <CuriosityOfTheDay />
    </ScreenLayout>
  );
};

export default HomeScreen;
