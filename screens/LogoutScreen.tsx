import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RenderCardListContext } from "../contexts/LoginContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colorsApp } from "../assets/colors/colorsApp";

const LogoutScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  let { toggleIsListRendered } = useContext(RenderCardListContext);

  const logOff = () => {
    alert("Loged off");
    toggleIsListRendered();
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para des logearse al usuario"
        onPress={logOff}
      >
        <Text style={styles.butonText}>LOG OFF</Text>
      </Pressable>
    </View>
  );
};

export default LogoutScreen;

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
});
