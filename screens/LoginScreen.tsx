import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import users from "../interfaces/users";
import React, { useContext, useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import { LoginUser } from "../services/userService";

const LoginScreen = () => {
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { toggleIsListRendered, setUserName } = useContext(
    RenderCardListContext
  );

  const handleChangeUsuario = (text: string) => {
    setInputUsuario(text);
  };
  const handleChangePassword = (text: string) => {
    setInputPassword(text);
  };

  const handleLogin = async () => {
    let user = {
      name: inputUsuario,
      password: inputPassword,
    };
    let codUser = await LoginUser(user);
    if (codUser == 200) {
      toggleIsListRendered();
      setUserName(user.name);
      Alert.alert(String(codUser), "Login successful");
    } else {
      Alert.alert(String(codUser), "Faltan datos o hay datos incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LOG-IN</Text>
      <Text style={styles.welcoming}>WELCOME</Text>

      <TextInput
        placeholder="USERNAME"
        placeholderTextColor={colorsApp.white}
        style={styles.inputs}
        onChangeText={handleChangeUsuario}
      ></TextInput>
      <TextInput
        placeholder="PASSWORD"
        secureTextEntry
        placeholderTextColor={colorsApp.white}
        style={styles.inputs}
        onChangeText={handleChangePassword}
      ></TextInput>

      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para al usuario"
        onPress={() => handleLogin()}
      >
        <Text style={styles.butonText}>LOGIN</Text>
      </Pressable>

      <Text style={styles.passwordForgot}>Forgot Password?</Text>
    </View>
  );
};

export default LoginScreen;

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
  header: {
    fontSize: 70,
    fontWeight: "bold",
    color: colorsApp.white,
    marginTop: "-15%",
    textDecorationLine: "underline",
  },
  welcoming: {
    color: colorsApp.white,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "8%",
  },
  inputs: {
    borderStyle: "solid",
    borderWidth: 2,
    width: "90%",
    borderRadius: 4,
    borderColor: colorsApp.purple,
    paddingVertical: "2%",
    paddingHorizontal: 20,
    marginBottom: "4%",
    color: colorsApp.white,
  },
  passwordForgot: {
    color: colorsApp.white,
    alignSelf: "flex-end",
    marginRight: 20,
  },
});
