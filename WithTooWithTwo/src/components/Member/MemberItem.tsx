import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';

function MemberItem({
  groupId,
  leader,
  members,
}: {
  groupId?: string;
  leader: string;
  members: string[];
}) {
  const navigation = useNavigation<any>();
  const pressMemberHandler = () => {};
  const pressMemberListHandler = () => {
    // navigation.navigate('GroupDetail', {
    //   screen: 'GroupMember',
    //   params: {groupId: groupId},
    // });
    navigation.navigate('GroupMember', {groupId: groupId});
  };
  return (
    <View style={styles.container}>
      <View style={styles.leaderBox}>
        <Pressable style={styles.leaderItem}>
          <Text style={styles.itemText}>{leader}</Text>
        </Pressable>
      </View>
      <View style={styles.memberBox}>
        {members.map((el, index) => (
          <Pressable
            onPress={pressMemberHandler}
            key={index}
            style={[styles.memberItem, {left: index * -10, zIndex: index}]}>
            <Text style={styles.itemText}>{el}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={pressMemberListHandler}>
        <Text> more </Text>
      </Pressable>
    </View>
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leaderBox: {
    marginRight: -20,
  },
  leaderItem: {
    width: 42,
    height: 42,
    backgroundColor: Colors.grey4,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderColor: Colors.primary500,
    borderWidth: 2,
  },
  memberBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberItem: {
    width: 38,
    height: 38,
    backgroundColor: Colors.grey1,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemText: {
    fontWeight: '300',
  },
});

export default MemberItem;
