import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductProps } from "../types";
import { metrics } from "../utils/metrics";
import { colors } from "../utils/colors";

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { title, description, price, images } = product;

  const navigation = useNavigation();

  const navigateToDetail = () => {
    //@ts-ignore
    navigation.navigate("ProductDetail", { product });
  };

  return (
    <View style={styles.productContainer}>
      <Image
        style={styles.postImage}
        resizeMode="contain"
        source={{ uri: product.images[0] }}
      />

      <TouchableOpacity onPress={navigateToDetail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>
          Price: <Text style={styles.priceBold}>${price}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginVertical: 10,
    padding: 10,
    width: metrics.width * 0.9,
    borderRadius: 10,
    backgroundColor: colors.gray,
  },
  postImage: {
    height: metrics.height * 0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.black,
    marginBottom: 7,
  },
  price: {
    fontSize: 16,
    color: colors.black,
  },
  priceBold: {
    fontSize: 16,
    color: colors.red,
  },
});

export default ProductItem;
