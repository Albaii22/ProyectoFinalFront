import * as React from "react";
import { StyleSheet, Text, View, Image, ImageProps } from "react-native";
import { colorsApp } from "../assets/colors/colorsApp";

export const ShowPortfolio = () => {
  return (
    <View style={styles.bodystails}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.descContainer}>
          <Text
            style={{ textAlign: "center", fontWeight: "700", fontSize: 20 }}
          >
            Descripción sobre mi
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodystails: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorsApp.black,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  descContainer: {
    margin: 10,
    backgroundColor: colorsApp.white,
    padding: 10,
    borderRadius: 10,
    width: "70%",
  },
});

export default ShowPortfolio;
