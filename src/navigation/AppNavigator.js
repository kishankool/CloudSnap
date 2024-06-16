import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
// import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Login";
import Upload from '../screens/Upload';
// import ProfileScreen from "../screens/ProfileScreen";
// import ContactUsScreen from "../screens/ContactUs";
// import DoubtScreen from "../screens/Doubts";
// import RegisterScreen from "../screens/Register";
// import Intent from '../screens/Intent';
// import LeaseRegisterScreen from '../screens/LeaseRegistration';
// import DoubtDetail from "../screens/DoubtDetail";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Intent">
      {/* <InsideStack.Screen name="Profile" component={ProfileScreen} />
      <InsideStack.Screen name="Register" component={RegisterScreen} />
      <InsideStack.Screen name="Lease Register" component={LeaseRegisterScreen} />
      <InsideStack.Screen name="Intent" component={Intent} /> */}
      {/* <InsideStack.Screen name="Home" component={HomeScreen} /> */}
      <InsideStack.Screen name="Upload" component={Upload} />
      {/* <InsideStack.Screen name="ContactUs" component={ContactUsScreen} />
      <InsideStack.Screen name="Doubts" component={DoubtScreen} />
      <InsideStack.Screen name="Replies" component={DoubtDetail} /> */}
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
