import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';



const ParallaxCarousel = () => {
    const WIDTH = Dimensions.get('window').width
    const data = [
        {
            id: 1,
            title: 'First Slide',
            image: 'https://picsum.photos/640/481',
        },
        {
            id: 2,
            title: 'Second Slide',
            image: 'https://picsum.photos/640/482',
        },
        {
            id: 3,
            title: 'Third Slide',
            image: 'https://picsum.photos/640/483',
        },
        {
            id: 4,
            title: 'Fourth Slide',
            image: 'https://picsum.photos/640/484',
        },
    ];
    return (
        <View>
            <Carousel
                width={WIDTH}
                height={WIDTH / 2}
                data={data}
                autoPlay={true}
                pagingEnabled={true}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <View style={styles.carousel}>
                        <Image style={styles.img} source={{ uri: item.image }} />
                    </View>
                )}
            /></View>
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
        width: "100%",
        height: "100%"
    }
});
