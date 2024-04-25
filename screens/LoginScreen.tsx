import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Button,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import { LoginUser } from "../services/userService";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

type LoginScreenProps = {
  setIsInLogin: Function;
};

const LoginScreen = ({ setIsInLogin }: LoginScreenProps) => {
  const navigation = useNavigation();
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertBody, setAlertBody] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
      setUserName(user.name);
      setAlertMessage("Login successful");
      setAlertBody("User " + user.name + " successfully logged in");
      toggleModal();
      setTimeout(() => {
        toggleIsListRendered();
      }, 1500);
    } else {
      setAlertMessage("ERROR");
      setAlertBody("username or password incorrect");
      toggleModal();
      setTimeout(() => {
        setIsModalVisible(false);
      }, 2000);
    }
  };

  const goToRegister = () => {
    setIsInLogin(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LOG-IN</Text>

      <TextInput
        placeholder="USERNAME"
        placeholderTextColor={colorsApp.red}
        style={styles.inputs}
        onChangeText={handleChangeUsuario}
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
        onPress={() => handleLogin()}
      >
        <Text style={styles.butonText}>LOGIN</Text>
      </Pressable>

      <View style={styles.rowButtons}>
        <Pressable
          style={styles.registerLink}
          accessibilityLabel="Buton para al usuario"
          onPress={() => goToRegister()}
        >
          <Text style={styles.registerText}>
            new here? <Text style={styles.registerPhrase}>Register!</Text>
          </Text>
        </Pressable>
        <Text style={styles.passwordForgot}>Forgot Password?</Text>
      </View>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colorsApp.white,
    justifyContent: "center",
  },
  registerLink: {
    marginLeft: "5%",
    marginRight: "25%",
  },
  registerText: {
    color: colorsApp.dark_blue,
  },
  registerPhrase: {
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
  containerAlert: {
    marginTop: "90%",
    alignItems: "center",
  },
  alert: {
    backgroundColor: colorsApp.light_gray,
    borderColor: colorsApp.dark_blue,
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
    color: colorsApp.red,
  },
  alertBody: {
    marginTop: "5%",
    fontSize: 20,
    paddingBottom: "10%",
    alignSelf: "center",
    justifyContent: "center",
    color: colorsApp.red,
  },
  rowButtons: {
    alignContent: "center",
    flexDirection: "row",
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
  passwordForgot: {
    color: colorsApp.dark_blue,
    alignSelf: "flex-end",
    marginRight: 20,
  },
});
