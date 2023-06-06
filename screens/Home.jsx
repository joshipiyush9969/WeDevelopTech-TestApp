import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

import data from "../assets/data";
import NextButton from "../components/NextButton";



const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        flexDirection: "row",
        bottom: "25%",
      }}
    >
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 8,
              width: 8,
              borderRadius: 5,
              backgroundColor: "#989898",
              opacity,
              marginHorizontal: 5,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

export default function Home({ navigation }) {


  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        contentContainerStyle={{ paddingBottom: 0 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(item, key) => key}
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width,
                alignItems: "center",

                flex: 1,
                paddingTop: "40%",
              }}
            >
              <Image
                style={{
                  width:
                    index == 2 ? width : index == 1 ? width / 1.6 : width / 2,
                  height: "40%",

                  marginBottom: "15%",
                }}
                source={item.image}
                resizeMode="contain"
              />

              <View style={{ width: "90%" }}>
                <Text
                  style={{
                    color: "#373737",
                    fontFamily: "Roboto-Bold",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "#373737",
                    fontFamily: "Roboto-Regular",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      <NextButton
        text={"Get Started"}
        color={"#41b757"}
        textColor={"#ffffff"}
        onPress={() => navigation.replace("Disclaimer")}
        isPrimary={true}
        absolute={true}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
