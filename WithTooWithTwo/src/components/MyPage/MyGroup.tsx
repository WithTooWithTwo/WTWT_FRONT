import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {fetchGroupList, GroupType} from '../../util/group';
import {Colors} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyGroupItem from './MyGroupItem';
import {useNavigation} from '@react-navigation/native';
import {MyPageStackParamList} from '../../screens/Authenticated/MyPageScreen';

const MyGroup = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchGroupList().then(res => {
      setGroups(res);
    });
  }, []);

  const groupListPressHandler = () => {
    navigation.navigate('MyPageGroups', {groups: groups});
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>함께한 그룹</Text>
        <Pressable onPress={groupListPressHandler}>
          <Ionicons name={'chevron-forward'} color={Colors.grey4} size={17} />
        </Pressable>
      </View>
      <View style={styles.contentBox}>
        {groups.length !== 0 && <MyGroupItem group={groups[0]} />}
        {groups.length >= 2 && <MyGroupItem group={groups[1]} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },

  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyGroup;
