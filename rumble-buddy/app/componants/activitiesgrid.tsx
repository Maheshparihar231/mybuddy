import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './card'
import { getCredentials } from '../secureStore/secureStoreService'
import { API_URL } from '@/constants/api'
interface Activity {
    id: string;
    price: string;
    title: string;
    image_url: string;
    posted_date: string;
    user_id: string;
  }
const Activitiesgrid = () => {
    const [error, setError] = useState<string | null>(null);
    const [activityData, setactivityData] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch data from the API
    const fetchPosts = async () => {
        try {
            const credentials = await getCredentials();
            if (!credentials) {
                throw new Error('User credentials not found');
            }
            const response = await fetch(`${API_URL}/api/activity/user/${credentials.userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json(); // Cast jsonData to Activity[]
            setactivityData(jsonData);
        } catch (err) {
            // Cast err to a string
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
        <View style={styles.container}>
            {activityData.map(activity => (
                <Card
                    key={activity.id} // Assign a unique key to each Card
                    data={{
                        id: activity.id,
                        price: activity.price,
                        title: activity.title,
                        image_url: activity.image_url,
                        posted_date: activity.posted_date,
                        user_id: activity.user_id,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})