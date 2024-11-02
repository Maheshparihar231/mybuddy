import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostsGrid from '../componants/postsGrid';
import { API_URL } from '@/constants/api';
import { getCredentials } from '../secureStore/secureStoreService';

interface UserData {
  user_id: string;
  profile_picture: string;
  name: string;
  bio: string;
  posts: number;
  followers: number;
  default_location: string;
  is_verified: boolean;
  date_joined: string;
  following: number;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // Change to UserData or null

  // Function to fetch data from the API
  const fetchUserData = async () => {
    try {
      const credentials = await getCredentials();
      if (!credentials) {
        throw new Error('User credentials not found');
      }
      const response = await fetch(`${API_URL}/api/userdetails/${credentials.userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData: UserData = await response.json(); // Cast jsonData to UserData
      setUserData(jsonData); // Set userData to a single user object
    } catch (err) {
      // Cast err to a string
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  // Ensure userData is not null before accessing its properties
  if (!userData) {
    return <Text style={styles.errorText}>User data not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 10 }}>
        <View style={styles.header}>
          <View>
            <Image source={{ uri: userData.profile_picture }} style={styles.profileImage} />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userName}>
              <Text style={styles.name}>{userData.name}</Text>
              {userData.is_verified && (
                <TouchableOpacity>
                  <MaterialCommunityIcons name="check-decagram" size={25} color="#4CAF50" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.bio}>{userData.bio}</Text>
          <Text style={styles.location}>{userData.default_location}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity activeOpacity={0.8} style={styles.profileBtn}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.profileBtn}>
          <Text style={styles.btnText}>Share Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <PostsGrid />
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  userName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  bio: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  profileBtn: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    color: '#fff'
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postImage: {
    width: '31%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
})