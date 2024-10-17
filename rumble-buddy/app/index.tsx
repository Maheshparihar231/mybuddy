import { Redirect } from "expo-router";
import { useState } from "react";
import { Text, View,StyleSheet,TouchableOpacity } from "react-native";

export default function Index() {
  const [start, setStart] = useState(false);

  if (start) {
    return <Redirect href="/screens/login" />;
  }

  return (
    <View style={styles.container}>
      <Text>Splash Screen Animation</Text>
      <TouchableOpacity  style={styles.button} onPress={() => setStart(true)} >
      <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    width: '80%', // Makes the button wider
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
})



