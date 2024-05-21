import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import LoginScreen from "./LoginScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  let { userName, isListRendered } = useContext(RenderCardListContext);

  const allMessages = [];

  for (let i = 1; i <= 20; i++) {
    allMessages.push(
      <View key={i} style={styles.item}>
        <Text style={styles.text}>Item {i}</Text>
      </View>
    );
  }

  return <ScrollView style={styles.container}>{allMessages}</ScrollView>;
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.white,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});
