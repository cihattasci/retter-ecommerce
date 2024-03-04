import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ProductAPIResponseInterface } from "../types";

type CartItemProps = {
  product: ProductAPIResponseInterface;
  removeProduct: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ product, removeProduct }) => {
  const handleRemoveProduct = () => {
    removeProduct(product.id);
  };

  return (
    <View>
      <Text onPress={handleRemoveProduct}>{product.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartItem;
