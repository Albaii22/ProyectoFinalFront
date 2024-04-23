import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import users from "../interfaces/users";
import { RenderCardListContext } from "../contexts/LoginContext";
import { registerUser } from "../services/userService";

const RegisterScreen = () => {
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const { toggleIsListRendered, setUserName } = useContext(
    RenderCardListContext
  );
  let { userName, isListRendered } = useContext(RenderCardListContext);

  const handleChangeUsuario = (text: string) => {
    setInputUsuario(text);
  };
  const handleChangePassword = (text: string) => {
    setInputPassword(text);
  };
  const handleChangeEmail = (text: string) => {
    setInputEmail(text);
  };

  const handleRegister = async () => {
    let usuario = {
      name: inputUsuario,
      email: inputEmail,
      password: inputPassword,
    };

    if (inputUsuario == "" || inputPassword == "" || inputEmail == "") {
      return Alert.alert("Error", "Hay campos vacios");
    }

    if ((await registerUser(usuario)).codigoSalida == 201) {
      registerUser(usuario);
      toggleIsListRendered();
      setUserName(usuario.name);
    } else {
      let codError = (await registerUser(usuario)).codigoSalida;
      Alert.alert(codError.toString(), "Faltan datos o hay datos incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>
      <Text style={styles.welcoming}>WELCOME</Text>

      <TextInput
        placeholder="USERNAME"
        placeholderTextColor={colorsApp.white}
        style={styles.inputs}
        onChangeText={handleChangeUsuario}
      ></TextInput>
      <TextInput
        placeholder="EMAIL"
        placeholderTextColor={colorsApp.white}
        style={styles.inputs}
        onChangeText={handleChangeEmail}
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
        onPress={() => handleRegister()}
      >
        <Text style={styles.butonText}>REGISTER</Text>
      </Pressable>

      <Text style={styles.passwordForgot}>Forgot Password?</Text>
    </View>
  );
};

export default RegisterScreen;

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
