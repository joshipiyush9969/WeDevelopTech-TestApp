import React, { useState } from "react";
import { useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import NextButton from "../components/NextButton";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
export default function AddLocationModal({ onClose, navigation }) {
  const [pin, setPin] = useState("");

  const onPincodeLocation = () => {
    const regex = /^\d{6}$/;
    if (pin.trim().length != 0 && regex.test(pin)) {
      navigation.navigate("Result", { data: {Postal:pin} });
      onClose();
    } else {
      Alert.alert("Please enter your pincode ", "Enter the input correctly", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AntDesign
        onPress={onClose}
        style={{ alignSelf: "flex-end", margin: "2.5%" }}
        name="closecircleo"
        size={24}
        color="#111111"
      />
      <Image
        style={{
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").height * 0.1,
          marginTop: "2.5%",
          marginBottom: "2.5%",
        }}
        source={require("../assets/images/1.png")}
      />

      {/* <TouchableOpacity>
            <Text>Close Modal</Text>
          </TouchableOpacity> */}

      <TextInput
        placeholder=" Enter Pincode"
        style={{
          padding: 5,
          paddingVertical: 15,
          fontFamily: "Roboto-Regular",
          fontSize: 18,
          borderRadius: 5,
          borderWidth: 1,
          width: "90%",
          marginTop: "5%",
          borderColor: "#cdcdcd",
        }}
        onChangeText={setPin}
        keyboardType="phone-pad"
        value={pin}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: "5%",
        }}
      >
        <NextButton
          text={"Get Started"}
          color={"#41b757"}
          textColor={"#ffffff"}
          onPress={onPincodeLocation}
          isPrimary={true}
          absolute={false}
        />
      </View>
    </View>
  );
}
