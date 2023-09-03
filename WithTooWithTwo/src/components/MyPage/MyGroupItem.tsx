import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GroupType} from '../../util/group';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import MemberList from '../Member/MemberList';
import OverlappedMemberList from '../Member/OverlappedMemberList';

const MyGroupItem = ({group}: {group: GroupType}) => {
  const navigation = useNavigation<any>();
  const groupPressHandler = () => {
    navigation.navigate('GroupMain', {groupId: group.id.toString()});
  };

  return (
    <Pressable style={styles.container} onPress={groupPressHandler}>
      <Text style={styles.title}>
        {group.name.length > 13 ? group.name.slice(0, 13) + '...' : group.name}
      </Text>
      <Text style={styles.date}>{group.firstDay}</Text>
      <View style={styles.member}>
        <OverlappedMemberList leader={group.leader} members={group.members} />
      </View>
      <Text style={styles.detail}>자세히 보기 &gt; </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 163,
    height: 123,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    gap: 3,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
  },
  date: {
    fontSize: 11,
    fontWeight: '400',
    color: 'grey',
  },
  member: {
    justifyContent: 'flex-end',
    height: 50,
    paddingBottom: 10,
  },
  detail: {
    fontSize: 10,
    fontWeight: '300',
    color: Colors.grey4,
  },
});

export default MyGroupItem;
