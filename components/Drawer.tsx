import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import InfoUser from "../screens/Porfolio";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import LogoutScreen from "../screens/LogoutScreen";
import ActivityScreen from "../screens/ActivityScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecorderScreen from "../screens/RecorderScreen";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: colorsApp.purple,
    },
    headerTintColor: colorsApp.white,
    drawerItemStyle: {
      width: "90%",
    },
    drawerStyle: {
      backgroundColor: colorsApp.black,
    },
    drawerActiveTintColor: colorsApp.white,
    drawerActiveBackgroundColor: colorsApp.purple,
    drawerInactiveTintColor: colorsApp.light_gray,
    drawerInactiveBackgroundColor: colorsApp.gray,
    drawerType: "front",
  };

  let { isListRendered, toggleIsListRendered } = useContext(
    RenderCardListContext
  );

  return !isListRendered ? (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={drawerNavigatorScreenOptions}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Drawer.Navigator>
  ) : (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={drawerNavigatorScreenOptions}
      backBehavior="initialRoute"
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="User Info"
        component={InfoUser}
        options={{ title: "User Info" }}
      />
      <Drawer.Screen
        name="Activities"
        component={ActivityScreen}
        options={{ title: "Activities" }}
      />
      <Drawer.Screen
        name="Recorder"
        component={RecorderScreen}
        options={{ title: "Recorder" }}
      />
      <Drawer.Screen
        name="Log off"
        component={LogoutScreen}
        options={{ title: "Log off" }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {},
  headerTitle: {},
});
