import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import { registerUser } from "../services/userService";

type RegisterScreenProps = {
  setIsInLogin: Function;
};

const RegisterScreen = ({ setIsInLogin }: RegisterScreenProps) => {
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertBody, setAlertBody] = useState("");
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
    let user = {
      username: inputUsuario,
      email: inputEmail,
      password: inputPassword,
    };

    console.log(user);

    try {
      console.log("enters 1");
      const result = await registerUser(user);
      console.log("enters 2");

      if (result.codigoSalida === 200) {
        console.log("entro");

        setAlertMessage("User created!");
        setAlertBody("User " + user.username + " must logIn now");
        toggleModal();
        registerUser(user);
        setTimeout(() => {
          goToLogin();
        }, 1200);
      } else if (
        inputUsuario == "" ||
        inputPassword == "" ||
        inputEmail == ""
      ) {
        setAlertMessage("Error");
        setAlertBody("There are empty imputs");
        toggleModal();
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000);
      } else {
        setAlertMessage("ERROR");
        setAlertBody("username, password or email incorrect");
        toggleModal();
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const goToLogin = () => {
    setIsInLogin(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>

      <TextInput
        placeholder="USERNAME"
        placeholderTextColor={colorsApp.pink}
        style={styles.inputs}
        onChangeText={handleChangeUsuario}
      ></TextInput>
      <TextInput
        placeholder="EMAIL"
        placeholderTextColor={colorsApp.pink}
        style={styles.inputs}
        onChangeText={handleChangeEmail}
      ></TextInput>
      <TextInput
        placeholder="PASSWORD"
        secureTextEntry
        placeholderTextColor={colorsApp.pink}
        style={styles.inputs}
        onChangeText={handleChangePassword}
      ></TextInput>

      <Pressable
        style={styles.button}
        accessibilityLabel="Buton para al user"
        onPress={() => handleRegister()}
      >
        <Text style={styles.butonText}>REGISTER</Text>
      </Pressable>
      <Pressable
        style={styles.loginLink}
        accessibilityLabel="Buton para al user"
        onPress={() => goToLogin()}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.logInPhrase}>Log in</Text>
        </Text>
      </Pressable>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.containerAlert}>
          <View style={styles.alert}>
            <Text style={styles.alertHeader}>{alertMessage}</Text>
            <Text style={styles.alertBody}>{alertBody}</Text>
          </View>
        </View>
      </Modal>
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
  loginLink: {
    marginLeft: "5%",
    marginRight: "38%",
  },
  loginText: {
    color: colorsApp.light_blue,
  },
  logInPhrase: {
    color: colorsApp.pink,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.light_blue,
    width: "90%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: 20,
  },
  butonText: {
    fontSize: 20,
    color: colorsApp.black,
  },
  header: {
    fontSize: 70,
    fontWeight: "bold",
    color: colorsApp.light_blue,
    marginTop: "-15%",
    marginBottom: "10%",
    textDecorationLine: "underline",
  },
  inputs: {
    borderStyle: "solid",
    borderWidth: 2,
    width: "90%",
    borderRadius: 4,
    borderColor: colorsApp.light_blue,
    paddingVertical: "2%",
    paddingHorizontal: 20,
    marginBottom: "4%",
    color: colorsApp.light_blue,
  },
  containerAlert: {
    marginTop: "90%",
    alignItems: "center",
    height: "40%",
  },
  alert: {
    backgroundColor: colorsApp.beige,
    borderColor: colorsApp.light_gray,
    padding: 20,
    paddingBottom: "5%",
    width: "65%",
    height: "50%",
    borderRadius: 10,
    justifyContent: "center",
  },
  alertHeader: {
    marginTop: "5%",
    fontSize: 25,
    alignSelf: "center",
    color: colorsApp.pink,
  },
  alertBody: {
    marginTop: "5%",
    fontSize: 20,
    paddingBottom: "10%",
    alignSelf: "center",
    justifyContent: "center",
    color: colorsApp.pink,
  },
});
