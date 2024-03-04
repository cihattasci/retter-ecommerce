import React from "react";
import { Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { metrics } from "../utils/metrics";
import { colors } from "../utils/colors";

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <Swiper style={styles.swiper} activeDotColor={colors.black}>
      {images.map((uri: string, i: number) => (
        <Image
          style={styles.postImage}
          resizeMode="contain"
          source={{ uri }}
          key={`${uri}_${i}_uri`}
        />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiper: {
    borderRadius: 10,
    height: metrics.height * 0.2,
  },
  postImage: {
    height: metrics.height * 0.2,
  },
});

export default ImageSlider;
