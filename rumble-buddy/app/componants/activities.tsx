import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from './card'
import activities from '../Data/activity';

const Activities = () => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.heading}>Activities</Text>
                <TouchableOpacity>
                    <Text>view all</Text>
                </TouchableOpacity>
            </View>
            {activities.map(activity => (
                <Card
                    key={activity.id} // Assign a unique key to each Card
                    data={{
                        price: activity.price,
                        title: activity.title,
                        postedBy: activity.postedBy,
                        imageUrl: activity.imageUrl,
                    }}
                />
            ))}
        </View>
    )
}

export default Activities

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})