import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { RenderCardListContext } from "../contexts/LoginContext";
import { colorsApp } from "../assets/colors/colorsApp";

const Options = () => {
  let { themeMode, setThemeMode, toggleIsListRendered } = useContext(
    RenderCardListContext
  );

  const logOff = () => {
    alert("Loged off");
    toggleIsListRendered();
  };

  return !themeMode ? (
    <View style={styles.containerDark}>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para deslogearse al usuario"
        onPress={() => setThemeMode(true)}
      >
        <Text style={styles.butonText}>light mode</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.containerLight}>
      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para deslogearse al usuario"
        onPress={() => setThemeMode(false)}
      >
        <Text style={styles.butonText}>Dark mode</Text>
      </Pressable>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  containerLight: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.beige,
    justifyContent: "center",
  },
  containerDark: {
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
  butonText: {
    fontSize: 20,
    color: colorsApp.white,
  },
});
