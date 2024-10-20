import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

interface CardProps {
  data: {
    price: string;
    title: string;
    postedBy: string;
    imageUrl: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.cardHero}>
        <View style={styles.cardHeroHeader}>
          <Text style={styles.cardJobTitle}>{data.title}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardPrice}>{data.price}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardJobSummary}>
          <Image
            source={{ uri: data.imageUrl }}
            style={styles.cardJobIcon}
          />
          <View style={styles.cardJobDetails}>
            <Text>Posted By</Text>
            <Text style={styles.cardJobTitleSmall}>
              {data.postedBy}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => router.push('/screens/details')}
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
    backgroundColor: '#88898a',
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
    height:120,
    padding: 15,
    flexDirection:'column',
    justifyContent:'space-between',
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
  cardJobTitleSmall: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardBtn: {
    marginTop: 10,
    backgroundColor: '#141417',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardBtnText: {
    color: '#fff',
    fontSize: 16,
  },
});
