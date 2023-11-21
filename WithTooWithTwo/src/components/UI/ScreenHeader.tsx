import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function screenHeader({
  title,
  color,
  isGoBack,
  setting,
}: {
  title?: string;
  color: string;
  isGoBack: boolean;
  setting?: boolean;
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
      <View
        style={[
          styles.headerBox,
          isGoBack && styles.headerIconBox,
          setting && styles.settingIconBox,
        ]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {setting && (
        <FontAwesome5 name="ellipsis-v" size={16} style={styles.headerIcon} />
      )}
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
  settingIconBox: {
    marginLeft: 15,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
});
export default screenHeader;
