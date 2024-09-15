import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text:{
    marginTop : 20,
    marginLeft : 20,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  }
});
