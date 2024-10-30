import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { API_URL } from '@/constants/api';
import { getCredentials } from '../secureStore/secureStoreService';

interface CardProps {
  data: {
    id: string;
    price: string;
    title: string;
    posted_date: string;
    image_url: string;
    user_id: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ name: string; profile_picture: string } | null>(null);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${API_URL}/api/userdetails/${data.user_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const jsonData = await response.json();
      setUserData({
        name: jsonData.name,
        profile_picture: jsonData.profile_picture,
      });
    } catch (err) {
      // Cast err to a string
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchActivity();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHero}>
        <View style={styles.cardHeroHeader}>
          <Text style={styles.cardJobTitle}>{data.title}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardPrice}>{data.price}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardJobSummary}>
          <Image
            source={{ uri: userData?.profile_picture}}
            style={styles.cardJobIcon}
          />
          <View style={styles.cardJobDetails}>
            <Text style={styles.postedby}>Posted By {userData?.name}</Text>
            <Text style={styles.cardJobTitleSmall}>
              {data.posted_date}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cardBtn}
          onPress={() => router.push({ pathname: '/screens/details', params: { id: data.id } })}
        >
          <Text style={styles.cardBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e66135',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHero: {
    backgroundColor: '#fef4e2',
    borderRadius: 10,
    height: 120,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardJobTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardFooter: {
    marginTop: 10,
  },
  cardJobSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardJobIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cardJobDetails: {
    flex: 1,
  },
  postedby: {
    fontSize: 10,
    color: '#fff'
  },
  cardJobTitleSmall: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cardBtn: {
    marginTop: 10,
    backgroundColor: '#d9d7d7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardBtnText: {
    color: '#000',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
