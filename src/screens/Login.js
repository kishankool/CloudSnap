// Import necessary modules
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import SignIn from "../assets/png/login.png";
import Google from "../assets/png/google.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import HorizontalRuleWithText from "../components/HorizontalRule";

// Define LoginScreen component`
const LoginScreen = () => {
  GoogleSignin.configure({
    webClientId:
      "839836547815-3m14u6k2usde7o0rt73vqpr8daq25uu4.apps.googleusercontent.com",
  });
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpComponent, setOtpComponent] = useState(false);

  // Function to handle phone number change
  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  // Function to handle Google sign-in button press
  const onGoogleButtonPress = async () => {
    setLoading(true);
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      // navigation.navigate("Home");
    } catch (error) {
      console.log("Error signing in with Google", error);
    }
    setLoading(false);
  };

  // Function to handle sign in with phone number
  const signInWithPhoneNumber = async () => {
    setLoading(true);
    const phoneNumberRegex = /^\d{10}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      alert(
        "Invalid phone number. Please enter a valid 10-digit phone number."
      );
      setLoading(false);
      return;
    }

    try {
      const confirmation = await auth().signInWithPhoneNumber('+91'+ phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code", error);
    }
    setLoading(false);
    setOtpComponent(true);
  };

  // Function to confirm verification code
  const confirmCode = async () => {
    setLoading(true);
    try {
      const userCredential = await confirm.confirm(verificationCode);
    } catch (error) {
      console.log("Error validating code", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={Styles.centered}>
      <ScrollView
        contentContainerStyle={Styles.centeredScroll}
        showsVerticalScrollIndicator={false}
      >
        <Image style={Styles.welcomeImage} source={SignIn} />
        <Text style={Styles.welcomeText}>Welcome, Investor</Text>
        <TouchableOpacity
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress()}
          style={[Styles.googleSignin]}
        >
          <Image source={Google} style={Styles.googleImage} />
          <Text style={Styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
        <HorizontalRuleWithText text="or continue with Phone" />
        <Text style={Styles.phoneNumberText}>Phone Number</Text>
        <View style={Styles.registrationinputs}>
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            style={Styles.registrationinputstext}
          />
        </View>
        <TouchableOpacity
          style={Styles.sendOTPButton}
          onPress={signInWithPhoneNumber}
        >
          <Text style={Styles.sendOTPText}>Send OTP</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {otpComponent ? (
          <View style={Styles.otpComponent}>
            <Text style={Styles.phoneNumberText}>Enter OTP</Text>
            <View style={Styles.registrationinputs}>
              <TextInput
                style={Styles.registrationinputstext}
                onChangeText={setVerificationCode}
                value={verificationCode}
              />
            </View>
            <TouchableOpacity
              style={Styles.sendOTPButton}
              onPress={confirmCode}
            >
              <Text style={Styles.sendOTPText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

// Define styles
const Styles = StyleSheet.create({
  centered: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    padding: 20,
  },
  centeredScroll: {
    flexGrow: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "#002147",
    fontSize: 24,
    fontWeight: "900",
    alignSelf: "flex-start",
    fontFamily: "WorkSans_800ExtraBold",
    marginBottom: 30,
  },
  welcomeImage: {
    width: 260,
    height: 260,
    marginBottom: 26,
  },
  googleSignin: {
    width: "96%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    height: 56,
    gap: 16,
  },
  googleImage: {
    height: 24,
    width: 25,
  },
  googleText: {
    fontSize: 17,
    fontWeight: "900",
  },
  phoneNumberText: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginHorizontal: 11,
    marginVertical: 8,
  },
  registrationinputs: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#002147",
    paddingLeft: 8,
    width: "96%",
    height: 50,
  },
  registrationinputstext: {
    color: "#00000033",
    fontSize: 17,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  sendOTPButton: {
    width: "96%",
    height: 56,
    backgroundColor: "#000000",
    color: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sendOTPText: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  otpComponent: {
    width: "96%",
  },
});
