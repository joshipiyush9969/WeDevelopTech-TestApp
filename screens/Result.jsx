import React from "react";
import { View, Text } from "react-native";
export default function Result(props) {
  const { data } = props.route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {data?.Address ? (
        <View
          style={{
            width: "90%",
            borderTopColor: "white",
            borderBottomColor: "white",
            borderLeftColor: "#d90037",
            borderRightColor: "#d90037",
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderWidth: 1,
            padding: "5%",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",

              marginBottom: "2.5%",
              width: "80%",
            }}
          >
            <Text
              style={{
                marginRight: 5,
                fontFamily: "Roboto-Bold",
                fontSize: 16,
              }}
            >
              Address:
            </Text>
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15 }}>
              {data?.Address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "2.5%",
            }}
          >
            <Text
              style={{
                marginRight: 5,
                fontFamily: "Roboto-Bold",
                fontSize: 16,
              }}
            >
              Pincode:
            </Text>
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15 }}>
              {data?.Postal}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 16,
            }}
          >
            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16 }}>
              Latitude:{" "}
              <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15 }}>
                {data.Lat?.toFixed(3)}
              </Text>
            </Text>
            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16 }}>
              Longitude:{" "}
              <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15 }}>
                {data.Long?.toFixed(3)}
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "90%",
            borderTopColor: "white",
            borderBottomColor: "white",
            borderLeftColor: "#d90037",
            borderRightColor: "#d90037",
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderWidth: 1,
            padding: "5%",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "2.5%",
            }}
          >
            <Text
              style={{
                marginRight: 5,
                fontFamily: "Roboto-Bold",
                fontSize: 16,
              }}
            >
              Pincode:
            </Text>
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15 }}>
              {data?.Postal}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
