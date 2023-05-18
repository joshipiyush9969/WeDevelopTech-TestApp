import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import NextButton from "../components/NextButton";
import { Modalize } from "react-native-modalize";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import AddLocationModal from "../components/AddLocationModal";
import * as location from "expo-location";
import { POSITION_STACK_API_KEY } from "@env";

export default function Location({ navigation }) {
  const modalizeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    askPermission();
  });

  const askPermission = async () => {
    const { status } = await location.requestForegroundPermissionsAsync();

  };

  const onCurrentLocation = async () => {
    const { status } = await location.requestForegroundPermissionsAsync();
    try {
      setIsLoading(true);

      if (status === "granted") {
        const location_ = await location.getCurrentPositionAsync({});

        const lat = location_.coords.latitude;
        const long = location_.coords.longitude;

        const response = await fetch(
          `http://api.positionstack.com/v1/reverse?access_key=${POSITION_STACK_API_KEY}&query=${lat},${long}`
        );
        const resData = await response.json();
        const current = await resData.data[0].label;

        const data = {
          Address: current,
          Lat: lat,
          Long: long,
          Postal: resData.data[0].postal_code,
        };

        await navigation.navigate("Result", { data });
      }
    } catch (err) {
      Alert.alert("Something Went Wrong", "Please refresh the app", [
        { text: "OK" },
      ]);
    }

    setIsLoading(false);
  };

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  const handleCloseModal = () => {
    modalizeRef.current?.close();
  };
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",

        flex: 1,
        paddingTop: "20%",
      }}
    >
      <Image
        style={{
          width: "80%",
          height: "40%",
        }}
        resizeMode="contain"
        source={require("../assets/images/5.png")}
      />

      <View style={{ width: "90%", marginVertical: "15%" }}>
        <Text
          style={{
            color: "#373737",
            fontFamily: "Roboto-Bold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          {"Enter Your Location"}
        </Text>
        <Text
          style={{
            color: "#373737",
            fontFamily: "Roboto-Regular",
            fontSize: 20,
            textAlign: "center",
            marginTop: "2.5%",
          }}
        >
          {"We are currently serviceable in selected locations."}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      >
        {isLoading ? (
          <TouchableOpacity onPress={onCurrentLocation}
            style={{
              position: "relative",

              backgroundColor: "#41b757",
              padding: 5,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              width: "90%",
            }}
          >
            <ActivityIndicator size="small" color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <NextButton
            text={"Use Current Location"}
            color={"#41b757"}
            textColor={"#ffffff"}
            onPress={onCurrentLocation}
            isPrimary={true}
            absolute={false}
          />
        )}
      </View>

      <NextButton
        text={"Enter Pin code manually"}
        color={"#d90037"}
        textColor={"#ffffff"}
        onPress={() => handleOpenModal()}
        isPrimary={true}
        absolute={false}
      />
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <AddLocationModal onClose={handleCloseModal} navigation={navigation} />
      </Modalize>
    </View>
  );
}
