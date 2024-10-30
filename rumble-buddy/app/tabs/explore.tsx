import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../componants/search'
import searchTags from '../Data/quicksearch'
import userPosts from '../Data/posts'
import { useRouter } from 'expo-router'
import { API_URL } from '@/constants/api'

interface MediaItem {
  id: string,
  imageUrl: string,
  isLiked: boolean,
  likesCount: number,
  saved: boolean,
  sharesCount: number,
  bookmarksCount: number,
}

const Explore = () => {
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);
  // Function to fetch data from the API
  const fetchExploreData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json(); // Cast jsonData to Activity[]
      setData(jsonData);
    } catch (err) {
      // Cast err to a string
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchExploreData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }
  // Function to render each item (post or reel) in the grid
  const renderItem = ({ item }: { item: MediaItem }) => (
    <View style={styles.gridItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push({ pathname: '/screens/postscroll', params: { isUserPosts: 'false' } })}    // Trigger press action
      >
        <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Search />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer} // Add contentContainerStyle for padding
      >
        <View style={styles.row}>
          {searchTags.map((search, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              style={styles.searchBox}
            >
              <Text style={styles.searchText}>{search.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={{ marginTop: 5 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 10, // Adds padding to the left and right sides
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center items
  },
  searchBox: {
    marginRight: 10, // Spacing between boxes
    paddingVertical: 8, // Vertical padding inside the box
    paddingHorizontal: 12, // Horizontal padding inside the box
    borderWidth: 1, // Thickness of the border
    borderColor: '#aaa', // Border color (can be customized)
    borderRadius: 20, // Rounded corners
    borderStyle: 'dashed', // Dotted border
    backgroundColor: '#f5f5f5', // Light background color
  },
  searchText: {
    fontSize: 14, // Font size of the text
    color: '#333', // Text color (can be customized)
    fontWeight: '500', // Semi-bold text
  },
  gridItem: {
    flex: 1,
    margin: 0,
    aspectRatio: 1, // Square ratio
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
})