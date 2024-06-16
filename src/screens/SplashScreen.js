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
// import IIGMALogo from "../assets/logo/logo-primary.png";
import bg from "../assets/png/bg.png";

const SplashScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {/* <Image style={styles.welcomeImage} source={IIGMALogo} /> */}
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
