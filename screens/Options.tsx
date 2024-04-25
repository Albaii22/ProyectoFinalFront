import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RenderCardListContext } from "../contexts/LoginContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colorsApp } from "../assets/colors/colorsApp";

const Options = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  let { toggleIsListRendered } = useContext(RenderCardListContext);

  const logOff = () => {
    alert("Loged off");
    toggleIsListRendered();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para deslogearse al usuario"
        onPress={logOff}
      >
        <Text style={styles.butonText}>Dark mode</Text>
      </Pressable>
      <Pressable
        style={styles.buttonLogOff}
        accessibilityLabel="Buton para deslogearse al usuario"
        onPress={logOff}
      >
        <Text style={styles.butonLogOffText}>LOG OFF</Text>
      </Pressable>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.white,
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.light_gray,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 10,
    marginTop: "-120%",
  },
  buttonLogOff: {
    borderRadius: 10,
    backgroundColor: colorsApp.red,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 10,
  },
  butonText: {
    fontSize: 20,
    color: colorsApp.dark_blue,
  },
  butonLogOffText: {
    fontSize: 20,
    color: colorsApp.white,
  },
});
