import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, Theme } from "@react-navigation/native";
import Drawer from "./components/Drawer";
import React from "react";
import { LoginChecker } from "./providers/LoginChecker";
import "react-native-gesture-handler";
import { colorsApp } from "./assets/colors/colorsApp";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <LoginChecker>
        <NavigationContainer>
          <Drawer></Drawer>
          <StatusBar style="auto" />
        </NavigationContainer>
      </LoginChecker>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colorsApp.black,
  },
});
