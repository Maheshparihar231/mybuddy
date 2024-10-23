import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import userPosts from '../Data/posts'
import PostCard from '../componants/postCard'


const Postscroll = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={userPosts}
                renderItem={({ item }) => <PostCard post={item} />}
                keyExtractor={(item) => item.postId}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Postscroll

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        backgroundColor: '#f0f0f0', // Light background for the entire feed
    },
})