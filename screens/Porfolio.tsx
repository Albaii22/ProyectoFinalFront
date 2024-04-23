import { StyleSheet, Text, View, Image } from "react-native";
import { ShowPortfolio } from "../components/ShowPortfolio";
import React, { useState } from "react";
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { QRCodeSection } from "../components/QRCodeSection";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import users from "../interfaces/users";

const Portfolio = () => {
  const Tab = createMaterialTopTabNavigator();
  let { userName } = React.useContext(RenderCardListContext);

  const TabNavigatorScreenOptions: MaterialTopTabNavigationOptions = {
    tabBarInactiveTintColor: colorsApp.light_gray,
    tabBarActiveTintColor: colorsApp.white,
    tabBarStyle: { backgroundColor: colorsApp.purple },
    tabBarPressColor: colorsApp.fuchsia,
    tabBarIndicatorStyle: { backgroundColor: colorsApp.fuchsia },
  };

  return userName === users[0].nombre ? (
    <Tab.Navigator
      initialRouteName={userName}
      screenOptions={TabNavigatorScreenOptions}
    >
      <Tab.Screen name="User info" component={ShowPortfolio} />
      <Tab.Screen name="User QR" component={QRCodeSection} />
    </Tab.Navigator>
  ) : userName === users[1].nombre ? (
    <View style={styles.container}>
      <View style={styles.containerMsj}>
        <Image
          source={require("../assets/fox-emoji.png")}
          style={styles.picture}
        ></Image>
        <Text style={styles.msgOculto}>Sus</Text>
      </View>
      <Text style={styles.nombrecito}>Javier</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.nombrecito}>{userName} piensa:</Text>
      <Image
        source={require("../assets/fe.png")}
        style={styles.picture}
      ></Image>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  picture: {
    objectFit: "scale-down",
    width: "100%",
    height: "35%",
  },
  containerMsj: {
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    marginLeft: "6%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorsApp.black,
    flex: 1,
  },
  nombrecito: {
    color: colorsApp.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  msgOculto: {
    color: colorsApp.white,
    fontSize: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: colorsApp.white,
    borderRadius: 6,
    padding: "0.4%",
    paddingLeft: "0.7%",
  },
});
