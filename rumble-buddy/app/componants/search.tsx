import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Search = () => {
    // const [isFocused, setIsFocused] = useState(false);
    return (
        <View
            style={styles.container}
        >
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="#999" // Set a visible placeholder color
                />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    searchBox: {
        height: 50,
        width: '100%',
        borderColor: '#e87c58',
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Position relative for absolute child
    },
    focused: {
        position: 'absolute',
        top: 0, // Move to the top when focused
        zIndex: 1, // Ensure it stays on top
    },
    input: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 10, // Add padding inside the input
    },
})