import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  getUsuarioIdByUsername,
  updateAboutMe,
} from "../services/userDataService";

const Profile = () => {
  let { userName } = React.useContext(RenderCardListContext);
  const [text, setText] = useState("");
  const [actualMsg, setActualMsg] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertBody, setAlertBody] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  let { toggleIsListRendered } = React.useContext(RenderCardListContext);

  const logOff = () => {
    alert("Loged off");
    toggleIsListRendered();
  };

  const toggleEdit = () => {
    setIsEditActive(!isEditActive);
  };

  const isValidDate = (dateString: string) => {
    // Verifica que la fecha tenga el formato correcto (DD/MM/YYYY)
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
  };

  const saveData = async () => {
    if (text != actualMsg && text != null) {
      setActualMsg(text);
      const idUser = await getUsuarioIdByUsername(userName);
      console.log(idUser);

      updateAboutMe(idUser, text);
      setAlertMessage("Change successfull");
      setAlertBody("Information changed succesfully");
      toggleModal();
      setTimeout(() => {
        setIsModalVisible(false);
        toggleEdit();
      }, 1500);
    } else {
      setAlertMessage("Error");
      setAlertBody("Could not change information");
      toggleModal();
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/def-pfp.jpg")}
        style={styles.picture}
      ></Image>
      <Text style={styles.name}>{userName}</Text>
      <View style={styles.containerAboutMe}>
        <Text style={styles.aboutMe}>About me:</Text>
        {isEditActive ? (
          <View style={styles.containerEdit}>
            <TextInput
              style={styles.textArea}
              placeholder={actualMsg}
              placeholderTextColor="black"
              multiline={true}
              numberOfLines={4}
              onChangeText={(aboutMeMsg) => setText(aboutMeMsg)}
            />
            <View style={styles.birthdayContainer}>
              <Text style={styles.birthdayText}>Birthday: </Text>
              <TextInput
                style={styles.birthday}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={colorsApp.white}
              />
            </View>
            <Pressable
              style={styles.button}
              accessibilityLabel="Buton para editar la info del usuario"
              onPress={() => saveData()}
            >
              <Text style={styles.butonText}>Confirm changes</Text>
            </Pressable>
            <Pressable
              style={styles.buttonLogOff}
              accessibilityLabel="Buton para deslogearse al usuario"
              onPress={logOff}
            >
              <Text style={styles.butonText}>LOG OFF</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.containerEdit}>
            <Text style={styles.textArea} numberOfLines={4}>
              {actualMsg}
            </Text>
            <Pressable
              style={styles.button}
              accessibilityLabel="Buton para editar la info del usuario"
              onPress={() => toggleEdit()}
            >
              <Text style={styles.butonText}>Edit info</Text>
            </Pressable>
            <Pressable
              style={styles.buttonLogOff}
              accessibilityLabel="Buton para deslogearse al usuario"
              onPress={logOff}
            >
              <Text style={styles.butonText}>LOG OFF</Text>
            </Pressable>
          </View>
        )}
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
export default Profile;

const styles = StyleSheet.create({
  picture: {
    objectFit: "scale-down",
    width: "30%",
    height: "17%",
    borderRadius: 100,
  },
  containerAboutMe: {
    height: "90%",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colorsApp.black,
    flex: 1,
    paddingTop: "2%",
  },
  containerEdit: {
    height: "100%",
    alignSelf: "center",
  },
  name: {
    color: colorsApp.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  textArea: {
    height: "35%",
    width: 320,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    marginBottom: "15%",
    backgroundColor: colorsApp.white,
  },
  aboutMe: {
    color: colorsApp.white,
    marginBottom: "2%",
    right: "38%",
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorsApp.green,
    paddingVertical: "3%",
    width: 280,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  butonText: {
    fontSize: 20,
    color: colorsApp.white,
  },
  buttonLogOff: {
    borderRadius: 10,
    backgroundColor: colorsApp.red,
    paddingVertical: "3%",
    width: 280,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
  },
  birthdayContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    alignContent: "space-between",
  },
  birthdayText: {
    color: colorsApp.white,
    marginRight: "19%",
    fontSize: 20,
  },
  birthday: {
    marginLeft: "12%",
    color: colorsApp.white,
    fontSize: 20,
  },
  containerAlert: {
    marginTop: "90%",
    alignItems: "center",
    height: "40%",
  },
  alert: {
    backgroundColor: colorsApp.light_gray,
    borderColor: colorsApp.black,
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
});
