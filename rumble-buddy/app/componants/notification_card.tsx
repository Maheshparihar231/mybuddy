import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';

interface NotificationProps {
    notification: {
        title: string,
        eventName: string,
        eventId: string,         // Event identifier
        postedTime: string,     // Actual timestamp of the event post
        isRead: boolean,
    };
}

const Notification_card: React.FC<NotificationProps> = ({ notification }) => {
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.statusInd}></View>
                </View>
                <View style={styles.right}>
                    <View style={styles.textWrap}>
                        <Text style={styles.textContent}>
                            {notification.title}
                        </Text>
                        <Text style={styles.time}>{notification.postedTime}</Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <TouchableOpacity>
                            <Text style={styles.primaryCta}>View more</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.secondaryCta}>Mark as read</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Notification_card

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 16,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        marginBottom:4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    left: {
        justifyContent: 'center',
    },
    statusInd: {
        width: 10,
        height: 10,
        backgroundColor: '#ff3333',
        borderRadius: 5,
        margin: 6,
    },
    right: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
    },
    textWrap: {
        flexDirection: 'column',
        gap: 4,
    },
    textContent: {
        fontSize: 14,
        color: '#333',
    },
    textLink: {
        color: '#007BFF',
        fontWeight: '500',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    buttonWrap: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
    },
    primaryCta: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '600',
    },
    secondaryCta: {
        fontSize: 14,
        color: '#666',
    },
})