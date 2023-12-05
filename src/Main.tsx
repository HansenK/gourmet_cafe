import React from "react";
import { Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";

import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import HeaderActions from "./components/HeaderActions";
import HistoryScreen from "./screens/HistoryScreen";
import ReservationsScreen from "./screens/ReservationsScreen";
import ReservationScreen from "./screens/ReservationScreen";
import CompleteOrderScreen from "./screens/CompleteOrderScreen";
import { coffeeLogo } from "./images";
import useMe from "./hooks/useMe";
import { supabase } from "./lib/supabase";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainScreenTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { paddingBottom: 5 },
      headerLeft: () => <Image source={coffeeLogo} style={{ width: 30, height: 30 }} />,
      headerRight: () => <HeaderActions />,
      headerLeftContainerStyle: { paddingLeft: 15 },
      headerRightContainerStyle: { paddingRight: 10 },
      tabBarActiveTintColor: "#663300",
      headerStyle: { backgroundColor: "#DCD0C5" },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-account" color={color} size={28} />,
        tabBarLabel: "Início",
        headerTitle: "Gourmet Cafe",
      }}
    />
    <Tab.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" color={color} size={28} />,
        tabBarLabel: "Produtos",
        headerTitle: "Produtos",
      }}
    />
    <Tab.Screen
      name="History"
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" color={color} size={28} />,
        tabBarLabel: "Histórico",
        headerTitle: "Histórico",
      }}
    />
    <Tab.Screen
      name="Reservations"
      component={ReservationsScreen}
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" color={color} size={28} />,
        tabBarLabel: "Reservas",
        headerTitle: "Reservas",
      }}
    />
  </Tab.Navigator>
);

const Main = () => {
  const { data: me } = useMe();
  const queryClient = useQueryClient();

  const signInGuestUser = () => {
    supabase.auth
      .signInWithPassword({
        email: "guest@gourmetcafe.com",
        password: "Test123.AAA",
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      });
  };

  React.useEffect(() => {
    if (Boolean(me)) return;

    signInGuestUser();
  }, [me]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#DCD0C5" },
      }}
    >
      <Stack.Screen name="App" options={{ headerShown: false }} component={MainScreenTabNavigator} />
      <Stack.Screen name="Cart" options={{ headerTitle: "Carrinho" }} component={CartScreen} />
      <Stack.Screen name="ReservationScreen" options={{ headerTitle: "Nova Reserva" }} component={ReservationScreen} />
      <Stack.Screen name="CompleteOrderScreen" options={{ headerTitle: "Finalizar pedido" }} component={CompleteOrderScreen} />
    </Stack.Navigator>
  );
};

export default Main;
