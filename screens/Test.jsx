import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Voice from "@react-native-community/voice";

const App = () => {
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [gptResult,setGptResult] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };

  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/chat/completions";
      const onSpeechResultsHandler = async (e) => {
      let text = e.value[0];
      setResult(text);
      console.log("speech result handler", e);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "write todo for",
            },
            { role: "user", content: e.value[0] },
          ],
        }),
      });
      const resData = await response.json()
      let r = (resData.choices[0].message.content)
      setGptResult(r)
     // let r = "- Go for morning job- Clean the kitchen- Organize the party- Call friends and family members- Take your car for maintenance"
     // const todoArray = r.split('- ').filter(todo => todo.trim() !== '');
      
    }

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("en-Us");
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log("error raised", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="your text"
            style={{ flex: 1 }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 24,
            backgroundColor: "red",
            padding: 8,
            borderRadius: 4,
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
        </TouchableOpacity> */}
        <Text style={{ padding: 10 }}>
          {gptResult}
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "bold",
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
});

export default App;
