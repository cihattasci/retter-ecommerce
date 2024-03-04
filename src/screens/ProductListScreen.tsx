import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts, searchProducts } from "../store/slices/ProductSlice";
import { APIStatus } from "../utils/helpers";
import { colors } from "../utils/colors";
import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";

const ProductListScreen = () => {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    fetchProductsByPagination();
  }, [page]);

  const fetchProductsByPagination = () => {
    const skip = page === 1 ? 0 : (page - 1) * 20;
    dispatch(fetchProducts(skip));
  };

  const handleSearch = (searchQuery: string) => {
    dispatch(searchProducts(searchQuery));
  };

  if (products.status === APIStatus.LOADING) {
    return (
      <SafeAreaProvider style={styles.mainLoading}>
        <ActivityIndicator size="large" color={colors.black} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <SearchBar handleSearch={handleSearch} />

      <FlatList
        data={products.products}
        contentContainerStyle={{ marginVertical: 10 }}
        renderItem={({ item }) => (
          <ProductItem product={item} key={`${item.id}_product`} />
        )}
        ListFooterComponent={() => (
          <Pagination total={products.total} page={page} setPage={setPage} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainLoading: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    gap: 10,
    backgroundColor: colors.white,
    alignItems: "center",
  },
});

export default ProductListScreen;
