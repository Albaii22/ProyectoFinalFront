import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { colorsApp } from "../assets/colors/colorsApp";
import { getActivities } from "../services/activityService";

const ActivitiesScreen = () => {
  let [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
  let [totalActivities, setTotalActivities] = useState<string>("1");
  let [activities, setActivities] = useState<string[]>([]);

  const fetchActivities = () => {
    const fetchData = async () => {
      setDisplaySpinner(true);
      let newActivities: string[] = [];

      for (let i = 0; i < Number.parseInt(totalActivities); i++) {
        newActivities.push(await getActivities(totalActivities));
      }
      setActivities(newActivities);

      setDisplaySpinner(false);
    };

    fetchData();
  };

  const deleteFact = (index: number) => {
    const updatedFacts = [...activities];
    updatedFacts.splice(index, 1);
    setActivities(updatedFacts);
  };

  return (
    <View style={styles.screenContainer}>
      <Spinner
        visible={displaySpinner}
        textContent={"Requesting new activities..."}
        textStyle={{ color: "#FFF" }}
      />
      <Text style={styles.title}>Creador de nuevas actividades</Text>
      <TextInput
        style={styles.activityInput}
        onChangeText={setTotalActivities}
        value={totalActivities}
        placeholder="Inserta un número"
        placeholderTextColor={colorsApp.white}
        keyboardType="numeric"
      />
      <Pressable
        onPress={fetchActivities}
        style={styles.submitButton}
        accessibilityLabel="Find activities"
      >
        <Text style={styles.buttonText}> Find new activities! </Text>
      </Pressable>
      <FlatList
        style={styles.activitiesContainer}
        data={activities}
        renderItem={(activities) => (
          <View style={styles.listItems}>
            <Text style={styles.fact}>{activities.item}</Text>
            <Pressable
              onPress={() => deleteFact(activities.index)}
              style={styles.deleteButton}
              accessibilityLabel="erase facts"
            >
              <Text style={styles.buttonText}> Delete </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colorsApp.black,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: colorsApp.white,
  },
  activityInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    color: colorsApp.white,
    borderColor: colorsApp.purple,
  },
  submitButton: {
    backgroundColor: colorsApp.purple,
    color: colorsApp.white,
    width: "50%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  listItems: {
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
  },
  deleteButton: {
    backgroundColor: colorsApp.fuchsia,
    color: colorsApp.white,
    width: "20%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: colorsApp.white,
    textTransform: "uppercase",
  },
  activitiesContainer: {
    display: "flex",
    marginVertical: 10,
  },
  fact: {
    width: "80%",
    backgroundColor: colorsApp.light_gray,
    margin: 5,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
