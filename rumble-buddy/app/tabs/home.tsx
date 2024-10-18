import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Redirect, useRouter } from 'expo-router';
import Search from '../componants/search';
import ParallaxCarousel from '../componants/carousel';

const Home = () => {
  const router = useRouter(); // Initialize the router
  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <View>
          <TouchableOpacity style={styles.location}>
            <Text style={styles.locationText}>Raja Rani coliv..</Text>
            <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => { router.push('/screens/profile') }}>
            <MaterialCommunityIcons name="account-circle-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Search/>
      </View>
      <View>
        <ParallaxCarousel/>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationText: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 15,
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})