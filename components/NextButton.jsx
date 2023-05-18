import { TouchableOpacity,Text } from "react-native";

export default NextButton = ({ text, color, onPress, textColor,absolute,isPrimary }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: absolute ? "absolute" : "relative",
        bottom: absolute ? "15%" : undefined,
        backgroundColor: isPrimary ? color : undefined,
        padding: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        width: "90%",
      }}
    >
      <Text
        style={{
          fontSize: isPrimary?15:18,
          alignSelf: "center",
          justifyContent: "center",
          color: textColor,
          fontFamily: "Roboto-Bold",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
