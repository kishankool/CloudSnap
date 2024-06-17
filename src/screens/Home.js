// HomeScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Button from "../components/Button";


const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToUpload = () => {
    navigation.navigate("Upload");
  };

  const navigateToGallery = () => {
    navigation.navigate("Gallery");
  };

  const handleLogOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
        <Button theme="primary" label="Upload Media" onPress={navigateToUpload} />
      <View style={styles.separator} />
      <Button theme="primary" label="Gallery" onPress={navigateToGallery} />
      <View style={styles.separator} />
      <Button theme="primary" label="Log Out" onPress={handleLogOut} />
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
