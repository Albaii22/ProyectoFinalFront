import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import LoginScreen from "./LoginScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  let { userName, isListRendered } = useContext(RenderCardListContext);

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return !isListRendered ? (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME </Text>
      <Image
        source={require("../assets/fox-emoji.png")}
        style={styles.picture}
      ></Image>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para al usuario"
        onPress={goToLogin}
      >
        <Text style={styles.butonText}>LOGIN</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para al usuario"
        onPress={goToRegister}
      >
        <Text style={styles.butonText}>REGISTER</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME</Text>
      <Text style={styles.user}>{userName}</Text>
      <Image
        source={require("../assets/fox-emoji.png")}
        style={styles.picture}
      ></Image>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.black,
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.purple,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 20,
  },
  butonText: {
    fontSize: 20,
    color: colorsApp.white,
  },
  welcome: {
    fontSize: 50,
    fontWeight: "bold",
    color: colorsApp.white,
    marginTop: "-15%",
  },
  user: {
    fontSize: 50,
    fontWeight: "bold",
    color: colorsApp.white,
    marginTop: "-3%",
  },
  picture: {
    width: "10%",
    height: "5%",
  },
});
