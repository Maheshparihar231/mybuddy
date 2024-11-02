import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { getCredentials } from '../secureStore/secureStoreService';
import { API_URL } from '@/constants/api';

interface PostProps {
  data: {
    bookmarks_count: number;
    caption: string;
    image_url: string;
    is_verified: boolean;
    likes_count: number;
    location: string;
    post_id: string;
    posted_at: string; // You might want to consider using Date if you parse this later
    profile_pic: string;
    shares_count: number;
    tags: string[]; // Array of strings
    user_id: string;
    username: string;
    isLiked: boolean;
    saved: boolean;
  }
}

const PostCard: React.FC<PostProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [error, setError] = useState<string | null>(null);
  function handleLike() {
    // Function to fetch data from the API
    // const fetchPosts = async () => {
    //     try {
    //         const credentials = await getCredentials();
    //         if (!credentials) {
    //             throw new Error('User credentials not found');
    //         }
    //         const response = await fetch(`${API_URL}/api/posts/user/${credentials.userId}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         //implement the
    //         console.log(response);
    //     } catch (err) {
    //         setError((err as Error).message);
    //     } finally {
    //         //implement the final output after like
    //     }
    // };
  }

  return (
    <View style={styles.cardContainer}>
      {/* Header with profile info */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={{ uri: data.profile_pic }} style={styles.profileImage} />
          <View>
            <View style={styles.usernameRow}>
              <Text style={styles.username}>{data.username}</Text>
              {data.is_verified && (
                <MaterialCommunityIcons name="check-decagram" size={16} color="#3897f0" />
              )}
            </View>
            <Text style={styles.location}>{data.location}</Text>
          </View>
        </View>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#000" />
      </View>

      {/* Post Image */}
      <Image source={{ uri: data.image_url }} style={styles.postImage} />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => { handleLike() }}>
            <MaterialCommunityIcons name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? "#e91e63" : "#000"} />
          </TouchableOpacity>
          {/* //comment logic here
           <TouchableOpacity> 
            <MaterialCommunityIcons name="comment-outline" size={28} color="#000" />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name={data.saved ? "bookmark" : "bookmark-outline"} size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Likes, caption, tags */}
      <Text style={styles.likes}>{data.likes_count} likes</Text>
      <View style={styles.captionContainer}>
        <Text style={styles.username}>{data.username}</Text>
        <Text style={styles.caption}> {data.caption}</Text>
      </View>
      <Text style={styles.tags}>{data.tags}</Text>

      {/* Time and shares */}
      <Text style={styles.postTime}>{new Date(data.posted_at).toLocaleDateString()}</Text>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    marginBottom: 0,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  location: {
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  leftActions: {
    gap: 10,
    flexDirection: 'row',
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  caption: {
    fontWeight: '400',
  },
  tags: {
    paddingHorizontal: 10,
    color: '#3897f0',
  },
  postTime: {
    paddingHorizontal: 10,
    color: '#888',
    fontSize: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },
})