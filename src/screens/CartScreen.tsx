import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart } from "../store/slices/CartSlice";

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const removeProductFromCart = (id: number) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <SafeAreaProvider>
      <FlatList
        data={cart}
        contentContainerStyle={{ marginVertical: 10 }}
        renderItem={({ item }) => (
          <CartItem product={item} removeProduct={removeProductFromCart} />
        )}
        ListEmptyComponent={() => <Text>Your cart is empty</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
