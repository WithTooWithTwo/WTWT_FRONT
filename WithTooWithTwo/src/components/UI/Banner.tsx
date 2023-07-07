import {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
function Banner() {
  const [slideTime, setSlideTime] = useState(1);
  const bannerLists = [{}];
  useEffect(() => {
    const autoTimer = setTimeout(() => setSlideTime(8), 1000);
    return () => clearTimeout(autoTimer);
  }, []);

  return (
    <>
      <Swiper
        autoplay
        width={windowWidth}
        height={140}
        showsPagination={false}
        autoplayTimeout={2.5}>
        <View style={styles.banner}>
          <Text>slides1</Text>
        </View>
        <View style={styles.banner}>
          <Text>slides2</Text>
        </View>
        <View style={styles.banner}>
          <Text>slides3</Text>
        </View>
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#C5C7CD50',
    width: windowWidth,
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Banner;
