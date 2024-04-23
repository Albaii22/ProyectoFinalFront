import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import QRCode from "react-native-qrcode-svg";
import { RenderCardListContext } from "../contexts/LoginContext";
import { colorsApp } from "../assets/colors/colorsApp";

export const QRCodeSection = () => {
  let { userName } = React.useContext(RenderCardListContext);
  return (
    <View style={styles.bodystails}>
      <Text style={styles.user}>{userName}</Text>
      <View style={styles.CentrarcodigoQR}>
        <QRCode
          value="https://github.com/Foxssj"
          color={colorsApp.fuchsia}
          backgroundColor={colorsApp.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodystails: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: colorsApp.black,
  },
  CentrarcodigoQR: {
    justifyContent: "center",
    borderWidth: 1,
    width: "100%",
    height: "100%",
    paddingBottom: "30%",
    alignItems: "center",
  },
  user: {
    color: colorsApp.white,
    fontSize: 20,
    backgroundColor: colorsApp.fuchsia,
    width: "100%",
    paddingLeft: "41%",
  },
});
