import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Activitiesgrid from './activitiesgrid';

interface MediaItem {
    id: string;
    imageUrl: string;
}
const postsData = [
    { id: '1', imageUrl: 'https://picsum.photos/id/1/200/200' },
    { id: '2', imageUrl: 'https://picsum.photos/id/2/200/200' },
    { id: '3', imageUrl: 'https://picsum.photos/id/3/200/200' },
    { id: '4', imageUrl: 'https://picsum.photos/id/4/200/200' },
    { id: '5', imageUrl: 'https://picsum.photos/id/9/200/200' },
];

const reelsData = [
    { id: '1', imageUrl: 'https://picsum.photos/id/5/200/200' },
    { id: '2', imageUrl: 'https://picsum.photos/id/6/200/200' },
    { id: '3', imageUrl: 'https://picsum.photos/id/7/200/200' },
    { id: '4', imageUrl: 'https://picsum.photos/id/8/200/200' },
];

const PostsGrid = () => {
    const [activeTab, setActiveTab] = useState('Posts'); // State to track the active tab
    const slidingBarPosition = useRef(new Animated.Value(0)).current;
    // Function to render each item (post or reel) in the grid
    const renderItem = ({ item }: { item: MediaItem }) => (
        <View style={styles.gridItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
        </View>
    );

    useEffect(() => {
        // Set the sliding bar position based on the active tab
        const targetPosition = activeTab === 'Posts' ? 0 : 100; // Adjust according to your tab widths
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
            </View>

            {/* Content based on active tab */}
            {activeTab === 'Posts' ? (
                <FlatList
                    data={postsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                />
            ) : (
                <Activitiesgrid/>
            )}
        </View>
    )
}

export default PostsGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
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
        color: '#000',
        fontWeight: 'bold',
    },
    gridItem: {
        flex: 1,
        margin: 2,
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
        width: '10%', // Adjust according to your tab width
        backgroundColor: 'black',
    },
})