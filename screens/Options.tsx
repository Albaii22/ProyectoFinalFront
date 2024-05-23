import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RenderCardListContext } from "../contexts/LoginContext";
import { colorsApp } from "../assets/colors/colorsApp";

const Options = () => {
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
        // onPress={logOff}
      >
        <Text style={styles.butonText}>Dark mode</Text>
      </Pressable>
      <Pressable
        style={styles.buttonChangeLanguage}
        accessibilityLabel="Buton para deslogearse al usuario"
        // onPress={logOff}
      >
        <Text style={styles.butonText}>Change Language</Text>
      </Pressable>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.black,
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.pink,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 10,
    marginTop: "-120%",
  },
  buttonChangeLanguage: {
    borderRadius: 10,
    backgroundColor: colorsApp.pink,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 10,
  },
  butonText: {
    fontSize: 20,
    color: colorsApp.white,
  },
});
