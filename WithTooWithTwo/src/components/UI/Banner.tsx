import {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

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
        autoplayTimeout={5}>
        <View style={styles.banner}>
          <Image
            source={require('../../assets/main_banner.png')}
            style={styles.banner}
          />
        </View>
        <View style={styles.banner}>
          <Image
            source={require('../../assets/review_banner.png')}
            style={styles.banner}
          />
        </View>
        <View style={styles.banner}>
          <Image
            source={require('../../assets/post_banner.png')}
            style={styles.banner}
          />
        </View>
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: windowWidth,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Banner;
