import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import home from './home';
import setting from './setting';
import explore from './explore';

const Tab = createBottomTabNavigator();

const TabsIndex: React.FC = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarStyle: { backgroundColor: 'white', height: 60 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={explore}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-search-outline" color={color} size={24} />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={setting}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-circle-outline" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default TabsIndex;

const styles = StyleSheet.create({})