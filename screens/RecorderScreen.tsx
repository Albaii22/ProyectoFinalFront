import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AVPlaybackSource, Audio } from "expo-av";
import { colorsApp } from "../assets/colors/colorsApp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "recordings";

interface RecordingLine {
  sound: any;
  duration: string;
  file: string;
}

export default function App() {
  const [recording, setRecording] = useState<any>();
  const [recordings, setRecordings] = useState<RecordingLine[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    loadRecordings();
  }, []);

  async function saveRecordings(records: RecordingLine[]) {
    try {
      const recordingsJson = JSON.stringify(records);
      await AsyncStorage.setItem(STORAGE_KEY, recordingsJson);
    } catch (error) {
      console.error("Error saving recordings to AsyncStorage", error);
    }
  }

  const loadRecordings = async () => {
    try {
      console.log("loading...");
      const recordingsJson = await AsyncStorage.getItem(STORAGE_KEY);
      console.log("loaded");
      if (recordingsJson) {
        const loadedRecordings: RecordingLine[] = JSON.parse(recordingsJson);
        setRecordings(loadedRecordings);
      }
    } catch (error) {
      console.error("Error loading recordings from AsyncStorage", error);
    }
  };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
    saveRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis: number) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  const playRecordFile = async (recordFile: RecordingLine): Promise<void> => {
    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync({ uri: recordFile.file });
    await playbackObject.playAsync();
  };

  const deleteAudio = async (index: number) => {
    const updatedAudioList = [...recordings];
    updatedAudioList.splice(index, 1);
    setRecordings(updatedAudioList);
    saveRecordings(updatedAudioList);
  };

  async function deleteAll() {
    setRecordings([]);
    saveRecordings([]);
    console.log(recordings);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Pressable
            style={styles.buton}
            onPress={() => {
              playRecordFile(recordingLine);
            }}
          >
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
          <Pressable
            style={styles.buton}
            onPress={() => {
              deleteAudio(index);
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.butonsContainer}>
        <Pressable
          onPress={recording ? stopRecording : startRecording}
          style={styles.recordButton}
          accessibilityLabel="Record"
        >
          <Text style={styles.buttonText}>
            {recording ? "Stop Recording" : "Start Recording"}
          </Text>
        </Pressable>
        <Pressable style={styles.recordButton} accessibilityLabel="delete All">
          <Text style={styles.buttonText} onPress={() => deleteAll()}>
            Borrar todo
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scrollviewcito}>
        {getRecordingLines()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: colorsApp.black,
    justifyContent: "flex-start",
    padding: "2%",
  },
  butonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordButton: {
    borderRadius: 10,
    backgroundColor: colorsApp.purple,
    width: "45%",
    paddingVertical: "5%",
    alignItems: "center",
    marginVertical: "2%",
    marginHorizontal: "2%",
    marginBottom: "6%",
  },
  buton: {
    borderRadius: 10,
    backgroundColor: colorsApp.purple,
    width: "26%",
    height: "80%",
    paddingVertical: "2%",
    alignItems: "center",
    marginVertical: "2%",
    marginHorizontal: "2%",
  },
  buttonText: {
    fontSize: 20,
    color: colorsApp.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
    color: colorsApp.white,
  },
  scrollviewcito: {
    width: "100%",
    alignContent: "center",
  },
});
