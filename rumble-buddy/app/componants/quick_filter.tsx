import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import filters from '../Data/quick_filter'

const QuickFilter = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true} // Make the ScrollView horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filter}
            >
                {filters.map(filter => (
                    <View key={filter.id} style={styles.filter_index}>
                        <TouchableOpacity style={styles.filterBox}>
                            <MaterialCommunityIcons name={filter.icon} size={40} />
                        </TouchableOpacity>
                        <Text style={{ margin: 3, fontWeight: 'bold' }}>{filter.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default QuickFilter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    filter: {
        flexDirection: 'row'
    },
    filterBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4A90E2', // Soft blue color
        borderRadius: 40, // Softer, more rounded corners
        shadowColor: '#000', // Black shadow
        shadowOffset: { width: 0, height: 2 }, // Position of the shadow
        shadowOpacity: 0.3, // Shadow transparency
        shadowRadius: 4, // How blurry the shadow is
        elevation: 6, // Android shadow support
        borderWidth: 2, // Border to enhance the button look
        borderColor: '#fff', // White border for contrast
        width: 80, // Make each filterBox bigger
        height: 80, // Keep the height proportional
    },
    filter_index: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})