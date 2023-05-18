import React from "react";
import { View, Text, Image, Dimensions, BackHandler } from "react-native";
import NextButton from "../components/NextButton";

export default function Disclaimer({ navigation }) {
    const handleExit = () => {
      BackHandler.exitApp();
    };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: 'flex-end' }}>
      <Image
        source={require("../assets/images/disclaim.png")}
        resizeMode="contain"
      />
      <Text
        style={{
          marginHorizontal: "5%",
          fontFamily: "Roboto-Regular",
          fontSize: 18,
          textAlign: "center",
          color: "#868686",
          marginTop: "10%",
        }}
        resizeMode="contain"
      >
        Want to get your favourite drinks delivered at your doorsteps? All you
        have to do is tell us when you born.
      </Text>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        <NextButton
          onPress={() => navigation.replace("Location")}
          color={"#d41a24"}
          text={"I AM ABOVE THE AGE OF 21"}
          textColor={"#ffffff"}
          absolute={false}
          isPrimary={true}
        />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2.5%",
        }}
      >
        <NextButton
          onPress={handleExit}
          color={"#d41a24"}
          text={"EXIT"}
          textColor={"#d90037"}
          absolute={false}
          isPrimary={false}
        />
      </View>
      <Text
        style={{
          marginHorizontal: "2.5%",
          fontFamily: "Roboto-Regular",
          fontSize: 18,
          textAlign: "center",
          color: "#868686",
          marginTop: "2.5%",
          marginBottom:"20%"
        }}
      >
        By entering this application, you hearby agree to the{" "}
        <Text style={{ color: "#c7976a", textDecorationLine: "underline" }}>
          Terms of Service
        </Text>{" "}
        and{" "}
        <Text style={{ color: "#c7976a", textDecorationLine: "underline" }}>
          Privacy Policy
        </Text>{" "}
        of CheersByUnited
      </Text>
    </View>
  );
}
