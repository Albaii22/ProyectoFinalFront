import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, Theme } from "@react-navigation/native";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import { LoginChecker } from "./providers/LoginChecker";
import "react-native-gesture-handler";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <LoginChecker>
        <Header></Header>
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
    backgroundColor: "#fff",
  },
});
