import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";
import { Video } from "expo-av";
import auth from "@react-native-firebase/auth";
import { mediaAPIString } from "../utils/API";

const { width } = Dimensions.get("window");

const GalleryComponent = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const userId = auth().currentUser.uid;
      const response = await axios.get(
        `${mediaAPIString}/get/${userId}`
      );
      setMediaFiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching media files:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.mediaContainer}
        onPress={() => handleMediaPress(item)}
      >
        {item.type === "image" ? (
          <Image source={{ uri: item.url }} style={styles.image} />
        ) : (
          <Video
            source={{ uri: item.url }}
            style={styles.image}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
      </TouchableOpacity>
    );
  };

  const handleMediaPress = (item) => {
    // Handle media press action
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaFiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mediaContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width / 3 - 1,
    height: width / 3 - 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GalleryComponent;
