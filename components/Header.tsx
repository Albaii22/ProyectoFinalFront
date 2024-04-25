import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colorsApp } from "../assets/colors/colorsApp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ParamListBase } from "@react-navigation/routers/src/types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.textTile}>FlowVerse</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 45,
    backgroundColor: colorsApp.dark_blue,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textTile: {
    fontSize: 24,
    fontWeight: "bold",
    color: colorsApp.white,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
