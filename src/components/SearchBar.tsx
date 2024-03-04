import { StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import { metrics } from "../utils/metrics";

type SearchBarProps = {
  handleSearch: (searchQuery: string) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
}) => {
  useEffect(() => {
    !!searchQuery && handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <TextInput
      value={searchQuery}
      onChangeText={(text: string) => setSearchQuery(text)}
      style={styles.searchBar}
      placeholder="Search Products..."
      placeholderTextColor={colors.black}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: metrics.width * 0.9,
    height: metrics.height * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default SearchBar;
