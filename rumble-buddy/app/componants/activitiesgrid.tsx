import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import activitiesByUser from '../Data/activitiesByUser'
import Card from './card'

const Activitiesgrid = () => {
    return (
        <View style={styles.container}>
            {activitiesByUser.map(activity => (
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

export default Activitiesgrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
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