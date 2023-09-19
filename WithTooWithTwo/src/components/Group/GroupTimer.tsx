import {StyleSheet, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Colors} from '../../constants/styles';
import {useEffect, useState} from 'react';

const GroupTimer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>그룹 멤버들에게 리뷰를 남겨보세요</Text>
      <Fontisto name={'stopwatch'} size={20} color={Colors.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey11,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    gap: 3,
  },
  text: {
    fontSize: 10,
    color: Colors.grey4,
    letterSpacing: -0.32,
  },
});

export default GroupTimer;
