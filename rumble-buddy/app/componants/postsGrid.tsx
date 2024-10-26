import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, Animated, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Activitiesgrid from './activitiesgrid';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_URL } from '@/constants/api';
import { getCredentials } from '../secureStore/secureStoreService';

interface MediaItem {
    id: string;
    imageUrl: string;
    isLiked: boolean,
    likesCount: number,
    saved: boolean,
    sharesCount: number,
    bookmarksCount: number,
}

const PostsGrid = () => {
    const [activeTab, setActiveTab] = useState('Posts'); // State to track the active tab
    const slidingBarPosition = useRef(new Animated.Value(0)).current;
    const [selectedPost, setSelectedPost] = useState<MediaItem | null>(null); // State to track long-pressed post
    const router = useRouter(); // Initialize the router
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState([]);
    // Function to fetch data from the API
    const fetchPosts = async () => {
        try {
            const credentials = await getCredentials();
            if (!credentials) {
                throw new Error('User credentials not found');
            }
            const response = await fetch(`${API_URL}/api/posts/user/${credentials.userId}`);
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
        fetchPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    // Function to handle image long press
    const handleLongPress = (item: MediaItem) => {
        setSelectedPost(item);
    };

    // Function to render each item (post or reel) in the grid
    const renderItem = ({ item }: { item: MediaItem }) => (
        <View style={styles.gridItem}>
            <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={() => handleLongPress(item)} // Trigger long press action
                onPress={() => router.push('/screens/postscroll')}    // Trigger press action
                onPressOut={() => setSelectedPost(null)} // Reset post when press is released
            >
                <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        // Set the sliding bar position based on the active tab
        const targetPosition = activeTab === 'Posts' ? -100 : 100; // Adjust according to your tab widths
        Animated.spring(slidingBarPosition, {
            toValue: targetPosition,
            useNativeDriver: true,
        }).start();
    }, [activeTab]);

    return (
        <View style={styles.container}>
            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Posts')} style={styles.tabButton}>
                    <Text style={[styles.tabText, activeTab === 'Posts' && styles.activeTabText]}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Activities')} style={styles.tabButton}>
                    <Text style={[styles.tabText, activeTab === 'Activities' && styles.activeTabText]}>Activities</Text>
                </TouchableOpacity>
                {/* Sliding bar */}
                <Animated.View
                    style={[styles.slidingBar, { transform: [{ translateX: slidingBarPosition }] }]}
                />
                <View style={styles.divider}></View>
            </View>

            {/* Content based on active tab */}
            {activeTab === 'Posts' ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                />
            ) : (
                <Activitiesgrid />
            )}
            {selectedPost && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={!!selectedPost}
                    onRequestClose={() => setSelectedPost(null)} // Close modal when tapped outside
                >
                    <View style={styles.modalBackground}>
                        <Image source={{ uri: selectedPost.imageUrl }} style={styles.fullImage} />
                        <View style={styles.postDetails}>
                            {/* Icons with details, like Instagram */}
                            <View style={styles.detailsRow}>
                                {/* Likes */}
                                <TouchableOpacity style={styles.iconButton}>
                                    <FontAwesome
                                        name={selectedPost.isLiked ? 'heart' : 'heart-o'}
                                        size={24}
                                        color={selectedPost.isLiked ? 'red' : 'gray'}
                                    />
                                    <Text style={styles.iconText}>{selectedPost.likesCount}</Text>
                                </TouchableOpacity>

                                {/* Shares */}
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="share-social-outline" size={24} color="gray" />
                                    <Text style={styles.iconText}>{selectedPost.sharesCount}</Text>
                                </TouchableOpacity>

                                {/* Bookmarks */}
                                <TouchableOpacity style={styles.iconButton}>
                                    <MaterialCommunityIcons
                                        name={selectedPost.saved ? 'bookmark' : 'bookmark-outline'}
                                        size={24}
                                        color={selectedPost.saved ? 'blue' : 'gray'}
                                    />
                                    <Text style={styles.iconText}>{selectedPost.bookmarksCount}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

export default PostsGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 1,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#e87c58',
        fontWeight: 'bold',
    },
    gridItem: {
        flex: 1,
        aspectRatio: 1, // Square ratio
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    slidingBar: {
        position: 'absolute',
        bottom: 0,
        height: 5,
        width: '40%', // Adjust according to your tab width
        backgroundColor: '#e87c58',
        borderRadius: 40,
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: '100%', // Adjust according to your tab width
        backgroundColor: '#e87c58',
    },
    modalBackground: {
        flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },
    imageModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'cover', // Show image in full-size format
    },
    postDetails: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for the details
        borderRadius: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    iconText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})