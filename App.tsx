import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import ProductListScreen from "./src/screens/ProductListScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductList">
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{
              title: "Product List",
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            //@ts-ignore
            component={ProductDetailScreen}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              title: "Product Detail",
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              title: "Cart",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
