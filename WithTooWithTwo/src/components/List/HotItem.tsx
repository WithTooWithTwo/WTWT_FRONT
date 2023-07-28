import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

function HotItem({
  id,
  title,
  views,
  order,
}: {
  id: string;
  title: string;
  views: number;
  order: number;
}) {
  const navigation = useNavigation<any>();
  const postPressHandler = () => {
    navigation.navigate('PostDetail', {postId: id});
  };

  const isTopRank = order + 1 <= 3;

  return (
    <Pressable onPress={postPressHandler}>
      <View style={styles.container}>
        <Text
          style={[
            styles.orderBox,
            isTopRank && {color: '#3C70FF', fontWeight: 'bold'},
          ]}>
          {order + 1}
        </Text>
        <View style={styles.titleBox}>
          <Text>{title.length < 30 ? title : title.slice(0, 30)}</Text>
          {/*<Text>{title}</Text>*/}
        </View>
        <View style={styles.iconLabel}>
          <Ionicons name="eye" color="#3C70FF90" size={14} />
          <Text style={styles.iconText}>{views}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 43,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  orderBox: {width: 35},
  titleBox: {justifyContent: 'flex-start', flex: 1},
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
  },
  iconLabel: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    fontSize: 10,
    marginLeft: 7,
    color: '#AEAEAE',
    fontWeight: '400',
  },
});
export default HotItem;
