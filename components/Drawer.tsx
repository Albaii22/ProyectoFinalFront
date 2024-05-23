import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import LogoutScreen from "../screens/Options";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import Options from "../screens/Options";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: colorsApp.pink,
    },
    headerTintColor: colorsApp.white,
    drawerItemStyle: {
      width: "90%",
    },
    drawerStyle: {
      backgroundColor: colorsApp.black,
    },
    drawerActiveTintColor: colorsApp.beige,
    drawerActiveBackgroundColor: colorsApp.pink,
    drawerInactiveTintColor: colorsApp.beige,
    drawerInactiveBackgroundColor: colorsApp.dark_pink,
    drawerType: "back",
  };

  const { isListRendered, toggleIsListRendered } = useContext(
    RenderCardListContext
  );

  const [isInLogin, setIsInLogin] = useState(true);

  return !isListRendered ? (
    isInLogin ? (
      <LoginScreen setIsInLogin={setIsInLogin}></LoginScreen>
    ) : (
      <RegisterScreen setIsInLogin={setIsInLogin}></RegisterScreen>
    )
  ) : (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={drawerNavigatorScreenOptions}
      backBehavior="initialRoute"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />

      <Drawer.Screen
        name="Options"
        component={Options}
        options={{ title: "Options" }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {},
  headerTitle: {},
});
