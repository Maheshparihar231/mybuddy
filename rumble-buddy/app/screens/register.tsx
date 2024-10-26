import { StyleSheet, Text, TextInput, TouchableOpacity, View,KeyboardAvoidingView, Platform, Button  } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter  } from 'expo-router';
import { API_URL } from '@/constants/api';

const registerScreen = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful:', data);
        // Navigate to login or home screen or store user info here
        setPassword(''); // Clear the password field
      } else {
        // Handle errors (e.g., email already in use)
        console.error('Registration failed:', data.error || 'Unknown error');
        console.log(email,password,username);
      }
    } catch (error) {
      console.log(email,password,username);
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Button title="Sign in?" onPress={()=>router.back()}/>
    </KeyboardAvoidingView>
  )
}

export default registerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
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
    marginBottom:20,
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