import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostsGrid from '../componants/postsGrid';

const Profile = () => {
  const userData = {
    userId: '',
    profilePicture: 'https://picsum.photos/200/200',
    name: 'John Doe',
    bio: 'Traveler. Foodie. Photographer.',
    posts: 150,
    followers: 500,
    default_location: 'hydrabad, Telangana',
    isVerified: true,
    dateJoined: '2020-06-15',
    following: 300,
    userPosts: [
      'https://picsum.photos/seed/1/200/200',
      'https://picsum.photos/seed/2/200/200',
      'https://picsum.photos/seed/3/200/200',
      'https://picsum.photos/seed/4/200/200',
      'https://picsum.photos/seed/5/200/200',
    ],
  };
  const formatedDate = new Date(userData.dateJoined).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userName}>
            <Text style={styles.name}>{userData.name}</Text>
            {userData.isVerified && (
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
    padding: 10,
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
})