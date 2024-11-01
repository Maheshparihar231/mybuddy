import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from "./tabs/home";
import Profile from "./screens/profile";
import Explore from "./tabs/explore";
import Notification from "./screens/notification";
import Postscroll from "./screens/postscroll";
import { getCredentials } from "./secureStore/secureStoreService";

export default function Index() {
  const [start, setStart] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      const credentials = await getCredentials(); // Replace with your login check function
      if (credentials) {
        setIsLogged(true);
      }
    };
    checkLoginStatus();
  }, []);
  // Redirect to the appropriate screen based on login status
  useEffect(() => {
    if (isLogged) {
      router.replace('/tabs'); // Replace with your home screen path
    }
  }, [isLogged]);

  if (start) {
    return <Redirect href="/screens/login" />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Explore/> */}
      <View style={styles.container}>
        <Text>Splash Screen Animation</Text>
        <TouchableOpacity style={styles.button} onPress={() => setStart(true)} >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#e87c58',
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
    fontWeight: 'bold',
  },
})



