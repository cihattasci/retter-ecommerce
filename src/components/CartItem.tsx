import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ProductAPIResponseInterface } from "../types";
import { colors } from "../utils/colors";
import { metrics } from "../utils/metrics";

type CartItemProps = {
  product: ProductAPIResponseInterface;
  removeProduct: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ product, removeProduct }) => {
  const handleRemoveProduct = () => {
    removeProduct(product.id);
  };

  return (
    <View style={styles.cartItemContainer}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.cartItemImage}
        resizeMode="contain"
      />
      <View style={{ flex: 6, gap: 10 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${product.price}</Text>
        <TouchableOpacity onPress={handleRemoveProduct}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  cartItemImage: {
    width: metrics.width * 0.3,
    height: metrics.width * 0.3,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeText: {
    fontSize: 14,
    color: colors.red,
  },
  rightContainer: {
    flex: 2,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
