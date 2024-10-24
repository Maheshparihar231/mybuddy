import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostCard from '../componants/postCard'

interface PostProps {
    id: string,
    bookmarks_count: number;
    caption: string;
    image_url: string;
    is_verified: boolean;
    likes_count: number;
    location: string;
    post_id: string;
    posted_at: string; // You might want to consider using Date if you parse this later
    profile_picture: string;
    shares_count: number;
    tags: string[]; // Array of strings
    user_id: string;
    username: string;
    isLiked: boolean;
    saved: boolean;
}
interface PostResponse {
    posts: PostProps[]; // Array of PostProps
}
const Postscroll = () => {
    const [data, setData] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch data from the API
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/posts/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData: PostResponse = await response.json(); // Use PostResponse here
    
            // Log fetched data
            console.log('Fetched data:', jsonData.posts[0]);
    
            setData(jsonData.posts); // Access posts property
        } catch (err) {
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

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            {data.map(post => (
                <PostCard
                    key={post.id} // Assign a unique key to each Card
                    data={{
                        bookmarks_count: post.bookmarks_count,
                        caption: post.caption,
                        image_url: post.image_url,
                        is_verified: post.is_verified,
                        likes_count: post.likes_count,
                        location: post.location,
                        post_id: post.id,
                        posted_at: post.posted_at, // You might want to consider using Date if you parse this later
                        profile_pic: post.profile_picture,
                        shares_count: post.shares_count,
                        tags: post.tags, // Array of strings
                        user_id: post.user_id,
                        username: post.username,
                        isLiked: post.isLiked,
                        saved: post.saved,
                    }}
                />
            ))}
        </ScrollView>
    )
}

export default Postscroll

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        backgroundColor: '#f0f0f0', // Light background for the entire feed
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})