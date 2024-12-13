import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import { Redirect, useRouter } from 'expo-router';
import { saveCredentials } from '../secureStore/secureStoreService';
import { API_URL } from '@/constants/api';

const loginScreen = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <Redirect href="/tabs" />;
  }

  const handleLogin = async () => {
    setLoggedIn(true)
    // Handle login logic here 
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        // Access user_id and email from the response
        const { user_id, email } = data.user;

        // Save the credentials securely
        await saveCredentials(user_id, email);

        setLoggedIn(true)
        // You can navigate to the next screen or store user info here
        setPassword(''); // Clear the password field
      } else {
        // Handle errors (e.g., wrong credentials)
        console.error('Login failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button title="Don't have an account?" onPress={() => router.push('/screens/register')} />
    </KeyboardAvoidingView>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    marginBottom: 20,
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