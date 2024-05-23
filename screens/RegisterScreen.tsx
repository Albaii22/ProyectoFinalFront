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
import { RenderCardListContext } from "../contexts/LoginContext";
import AuthService from "../services/userService";

type RegisterScreenProps = {
  setIsInLogin: Function;
};

const RegisterScreen = ({ setIsInLogin }: RegisterScreenProps) => {
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
      username: inputUsuario,
      email: inputEmail,
      password: inputPassword,
    };

    if (inputUsuario == "" || inputPassword == "" || inputEmail == "") {
      return Alert.alert("Error", "Hay campos vacios");
    }

    try {
      console.log("enters 1");
      const result = await AuthService.register(usuario);
      console.log("enters 2");

      if (result.codigoSalida === 200) {
        console.log("entro");

        AuthService.register(usuario);
        toggleIsListRendered();
        setUserName(usuario.username);
      } else {
        let codError = (await AuthService.register(usuario)).codigoSalida;
        Alert.alert(
          codError.toString(),
          "Faltan datos o hay datos incorrectos"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToLogin = () => {
    setIsInLogin(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>

      <TextInput
        placeholder="USERNAME"
        placeholderTextColor={colorsApp.red}
        style={styles.inputs}
        onChangeText={handleChangeUsuario}
      ></TextInput>
      <TextInput
        placeholder="EMAIL"
        placeholderTextColor={colorsApp.red}
        style={styles.inputs}
        onChangeText={handleChangeEmail}
      ></TextInput>
      <TextInput
        placeholder="PASSWORD"
        secureTextEntry
        placeholderTextColor={colorsApp.red}
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
      <Pressable
        style={styles.loginLink}
        accessibilityLabel="Buton para al usuario"
        onPress={() => goToLogin()}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.logInPhrase}>Log in</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.white,
    justifyContent: "center",
  },
  loginLink: {
    marginLeft: "5%",
    marginRight: "38%",
  },
  loginText: {
    color: colorsApp.dark_blue,
  },
  logInPhrase: {
    color: colorsApp.red,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.dark_blue,
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
    color: colorsApp.dark_blue,
    marginTop: "-15%",
    textDecorationLine: "underline",
  },
  inputs: {
    borderStyle: "solid",
    borderWidth: 2,
    width: "90%",
    borderRadius: 4,
    borderColor: colorsApp.dark_blue,
    paddingVertical: "2%",
    paddingHorizontal: 20,
    marginBottom: "4%",
    color: colorsApp.dark_blue,
  },
});
