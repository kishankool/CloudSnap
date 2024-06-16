import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity ,Text,ScrollView} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CameraViewComponent from "../components/CameraView";
import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";
import auth from "@react-native-firebase/auth";
import axios from 'axios'
import { mediaAPIString } from "../utils/API";
const PlaceholderImage = require("../assets/png/background-image.png");

export default function Upload() {
  const user = auth().currentUser;
  const [selectedImage, setSelectedImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const toggleView = async () => {
    if (useCamera) {
      setUseCamera(false);
    } else {
      setUseCamera(true);
    }
  };

  const uploadImage = async (uri) => {
    if (!user) return;

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `photo.jpg`,
      type: `image/jpg`
    });

    try {
      const response = await axios.post(`${mediaAPIString}/upload/${user.uid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };


  return useCamera ? (
    <CameraViewComponent />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button theme="primary" label="Use Camera" onPress={toggleView} />
        <Button theme="primary" label="Use Photo" onPress={uploadImage} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    // alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
