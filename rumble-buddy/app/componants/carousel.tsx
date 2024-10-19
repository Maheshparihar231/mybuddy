import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import banners from '../Data/banners';

const ParallaxCarousel = () => {
    const WIDTH = Dimensions.get('window').width
    return (
        <Carousel
            width={WIDTH}
            height={WIDTH / 2}
            data={banners}
            mode='parallax'
            autoPlay={true}
            pagingEnabled={true}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
                <View style={styles.carousel}>
                    <Image style={styles.img} source={{ uri: item.image }} />
                </View>
            )}
        />
    );
};

export default ParallaxCarousel;

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    img: {
        borderRadius: 20,
        padding: 5,
        margin: 5,
        width: "95%",
        height: "100%"
    }
});
