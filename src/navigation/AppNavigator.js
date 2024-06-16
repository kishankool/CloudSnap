import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
// import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Login";
import Upload from '../screens/Upload';
import GalleryComponent from '../screens/Gallery';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Gallery">
      <InsideStack.Screen name="Upload" component={Upload} />
      <InsideStack.Screen name="Gallery" component={GalleryComponent} />
    </InsideStack.Navigator>
  );
}

const AppNavigator = () => {
  const [user, setUser] = React.useState(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
