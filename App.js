import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from './src/screens/SplashScreen';
import auth from "@react-native-firebase/auth";

function App() {
  const [nav, setNav] = useState(false);

  useEffect(() => {
    // Perform initial tasks here
    // For example, check user authentication
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        setNav(true);
      }, 3000);
    });

    return () => unsubscribe();
  }, []);

  return (
    nav ? <AppNavigator /> : <SplashScreen />
  );
}

export default App;
