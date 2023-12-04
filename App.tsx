import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./src/Main";
import CartContextProvider from "./src/contexts/CartContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#663300",
    secondary: "red",
  },
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <CartContextProvider>
            <Main />
            <StatusBar style="auto" />
          </CartContextProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
