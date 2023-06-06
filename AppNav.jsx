import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Home from "./screens/Home";
import Disclaimer from "./screens/Disclaimer";
import Location from "./screens/Location";
import Result from "./screens/Result";

//fonts
import { useFonts } from "expo-font";
import Test from "./screens/Test";

const Stack = createNativeStackNavigator();
function AppNav() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
  });
  

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Test"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Stack.Screen name ="Test" component={Test}/>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Disclaimer" component={Disclaimer} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNav;
