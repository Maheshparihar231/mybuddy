import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Notification_card from '../componants/notification_card'
import notifications from '../Data/notification'
import { getCredentials } from '../secureStore/secureStoreService'
import { API_URL } from '@/constants/api'

interface NotificationItem {
    id:string,
    title: string,
    event_name: string,
    event_id: string,         // Event identifier
    posted_time: string,     // Actual timestamp of the event post
    is_readed: boolean,
}
const Notification = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<NotificationItem[]>([]); // Specify type for state
    // Function to fetch data from the API
    const fetchUserNotifications = async () => {
        try {
            const credentials = await getCredentials();
            if (!credentials) {
                throw new Error('User credentials not found');
            }
            //const response = await fetch(`${API_URL}/api/notification/user/${credentials.userId}`);
            const response = await fetch(`${API_URL}/api/notification/user/6eafc9bb-6289-4c3f-9f95-01ff03716efd`); // for testing
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData: NotificationItem[] = await response.json(); // Cast jsonData to MediaItem[]
            setData(jsonData);           
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            const credentials = await getCredentials();
            if (!credentials) {
                throw new Error('User credentials not found');
            }
            
            const response = await fetch(`${API_URL}/api/notification/user/6eafc9bb-6289-4c3f-9f95-01ff03716efd/mark_all_as_read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
           
            if (!response.ok) {
                throw new Error('Failed to mark all notifications as read');
            }
            await fetchUserNotifications();
            // Update local state to set all notifications as read
            setData(prevData => prevData.map(notification => ({ ...notification, isReaded: true })));

        } catch (err) {
            setError((err as Error).message);
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchUserNotifications();
    }, []);
    // Render loading state
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Render error state
    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity onPress={handleMarkAllRead} style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <Text style={{ color: '#e87c58', fontWeight: 'bold', fontSize: 15 }}>mark all read</Text>
                </TouchableOpacity>
            </View>
            <View>
                {data.map(notifications => (
                    <Notification_card
                        key={notifications.id}
                        notification={{
                            title: notifications.title,
                            eventName: notifications.event_name,
                            eventId: notifications.event_id,         // Event identifier
                            postedTime: notifications.posted_time,     // Actual timestamp of the event post
                            isReaded: notifications.is_readed,
                        }}
                    />
                ))}
            </View>
            <View style={{ marginBottom: 30 }}></View>
        </ScrollView>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 10,
    },
    head: {
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})