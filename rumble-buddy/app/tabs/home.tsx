import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Redirect, useRouter } from 'expo-router';
import Search from '../componants/search';
import ParallaxCarousel from '../componants/carousel';
import QuickFilter from '../componants/quick_filter';
import Activities from '../componants/activities';

const Home = () => {
  const router = useRouter(); // Initialize the router
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.head}>
        <View style={{padding:10}}>
          <TouchableOpacity style={styles.location}>
            <Text style={styles.locationText}>Raja Rani coliv..</Text>
            <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => { router.push('/screens/profile') }}>
            <MaterialCommunityIcons name="bell-outline" size={30} tabBarBadge={3}/>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Search />
        <ParallaxCarousel />
        <QuickFilter/>
        <Activities/>
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