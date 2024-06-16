// HomeScreen.js
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToUpload = () => {
    navigation.navigate("Upload");
  };

  const navigateToGallery = () => {
    navigation.navigate("Gallery");
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Media" onPress={navigateToUpload} />
      <View style={styles.separator} />
      <Button title="Fetch Gallery" onPress={navigateToGallery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  separator: {
    marginVertical: 10,
  },
});

export default HomeScreen;
