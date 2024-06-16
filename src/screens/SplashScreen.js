import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import Logo from "../assets/logo/logo.jpeg";
import bg from "../assets/png/bg.jpeg";

const SplashScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.welcomeImage} source={Logo} />
        <Text> Image Picker</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    height: "50%",
    alignItems: "center",
  },

  welcomeImage: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
