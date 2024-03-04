import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart } from "../store/slices/CartSlice";
import { colors } from "../utils/colors";

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const removeProductFromCart = (id: number) => {
    dispatch(removeFromCart({ id }));
  };

  if (cart.length === 0) {
    return (
      <SafeAreaProvider style={styles.mainEmpty}>
        <Text style={{ fontSize: 20 }}>Your cart is empty</Text>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.main}>
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

const styles = StyleSheet.create({
  mainEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  main: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: colors.white,
  },
});

export default CartScreen;
