import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React from 'react'
import Notification_card from '../componants/notification_card'
import notifications from '../Data/notification'

const Notification = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.head}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Notification</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'red' }}>mark all read</Text>
                </TouchableOpacity>
            </View>
            <View>
                {notifications.map(notifications => (
                    <Notification_card
                        key={notifications.id}
                        notification={{
                            title: notifications.title,
                            eventName: notifications.eventName,
                            eventId: notifications.eventId,         // Event identifier
                            postedTime: notifications.postedTime,     // Actual timestamp of the event post
                            isRead: notifications.isReaded,
                        }}
                    />
                ))}
            </View>
            <View style={{marginBottom:30}}></View>
        </ScrollView>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        padding: 10,
    },
    head: {
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})