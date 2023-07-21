import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

function screenHeader({
  title,
  color,
  isGoBack,
}: {
  title?: string;
  color: string;
  isGoBack: boolean;
}) {
  const navigation = useNavigation();
  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.headerZone, {backgroundColor: color}]}>
      {isGoBack && (
        <Icon
          name="left"
          size={16}
          style={styles.headerIcon}
          onPress={goBackHandler}
        />
      )}
      <View style={[styles.headerBox, isGoBack ? styles.headerIconBox : null]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerZone: {
    height: 60,
    //backgroundColor: '#D9D9D930',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerIcon: {},
  headerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBox: {
    marginRight: 15,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
});
export default screenHeader;
