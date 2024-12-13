import { ActivityIndicator, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './card'
import { API_URL } from '@/constants/api';

interface Activity {
    id: string;
    price: string;
    title: string;
    posted_date: string;
    image_url: string;
    user_id: string;
}

const Activities = () => {
    const [data, setData] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch data from the API
    const fetchActivities = async () => {
        try {
            const response = await fetch(`${API_URL}/api/activity/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData: Activity[] = await response.json(); // Cast jsonData to Activity[]
            setData(jsonData);
        } catch (err) {
            // Cast err to a string
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchActivities();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.heading}>Activities</Text>
                <TouchableOpacity>
                    <Text>view all</Text>
                </TouchableOpacity>
            </View>
            {data.map(activity => (
                <Card
                    key={activity.id} // Assign a unique key to each Card
                    data={{
                        id:activity.id,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})