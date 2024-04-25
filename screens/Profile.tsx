import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { QRCodeSection } from "../components/QRCodeSection";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import users from "../interfaces/users";

const Profile = () => {
  const Tab = createMaterialTopTabNavigator();
  let { userName } = React.useContext(RenderCardListContext);

  return (
    <View style={styles.container}>
      <Text style={styles.nombrecito}>{userName} piensa:</Text>
      <Image
        source={require("../assets/fe.png")}
        style={styles.picture}
      ></Image>
    </View>
  );
};
export default Profile;

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
    backgroundColor: colorsApp.white,
    flex: 1,
  },
  nombrecito: {
    color: colorsApp.dark_blue,
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
