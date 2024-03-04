import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

type PaginationProps = {
  total: number;
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ total, page, setPage }) => {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: Math.ceil(total / 20) }, (_, i) => (
        <TouchableOpacity key={i} onPress={() => setPage(i + 1)}>
          <Text
            style={{
              color: i + 1 === page ? "red" : "black",
            }}
          >
            {i + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 10,
  },
});

export default Pagination;
