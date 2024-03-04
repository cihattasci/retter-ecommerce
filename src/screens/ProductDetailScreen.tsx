import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DetailScreenProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addToCart, removeFromCart } from "../store/slices/CartSlice";
import ImageSlider from "../components/ImageSlider";
import { colors } from "../utils/colors";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ProductDetailScreen: React.FC<DetailScreenProps> = ({
  route: {
    params: { product },
  },
}) => {
  const navigation = useNavigation();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch<AppDispatch>();

  const [isCart, setIsCart] = useState<boolean>(false);

  const {
    id,
    title,
    description,
    price,
    images,
    rating,
    category,
    brand,
    discountPercentage,
    stock,
  } = product;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToCart}>
          <Text style={styles.cartText}>Cart ({cart.length})</Text>
        </TouchableOpacity>
      ),
    });

    checkIfProductIsInCart();
  }, [cart.length]);

  const checkIfProductIsInCart = () => {
    const productInCart = cart.some((p) => p.id === id);
    setIsCart(productInCart);
  };

  const navigateToCart = () => {
    //@ts-ignore
    navigation.navigate("Cart");
  };

  const productToCart = () => {
    if (isCart) {
      dispatch(removeFromCart({ id: product.id }));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <SafeAreaProvider style={styles.main}>
      <ImageSlider images={images} />

      <View style={{ flex: 2 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>
          Price: <Text style={styles.priceBold}>${price}</Text>
        </Text>
        <Text style={styles.price}>
          Discount: <Text style={styles.priceBold}>{discountPercentage}%</Text>
        </Text>
        <Text style={styles.price}>
          Stock: <Text style={styles.priceBold}>{stock}</Text>
        </Text>
        <Text style={styles.price}>
          Brand: <Text style={styles.priceBold}>{brand}</Text>
        </Text>
        <Text style={styles.price}>
          Category: <Text style={styles.priceBold}>{category}</Text>
        </Text>
        <Text style={styles.price}>
          Rating: <Text style={styles.priceBold}>{rating}</Text>
        </Text>
      </View>

      {isCart ? (
        <TouchableOpacity
          style={styles.removeCartButton}
          onPress={productToCart}
        >
          <Text style={styles.removeCartButtonText}>Remove from Cart</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addCartButton} onPress={productToCart}>
          <Text style={styles.addCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    justifyContent: "center",
  },
  cartText: {
    fontSize: 14,
    color: colors.black,
  },
  removeCartButton: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  removeCartButtonText: {
    fontSize: 20,
    color: colors.white,
  },
  addCartButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addCartButtonText: {
    fontSize: 20,
    color: colors.white,
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
    fontSize: 14,
    color: colors.black,
    fontWeight: "100",
  },
  priceBold: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
