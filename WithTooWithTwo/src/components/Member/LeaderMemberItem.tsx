import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, MemberColors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {GroupMember} from '../../util/group';
import UserInfoModal from './UserInfoModal';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function LeaderMemberItem({
  groupId,
  leader,
  members,
}: {
  groupId?: number;
  leader: GroupMember;
  members: GroupMember[];
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalUserId, setModalUserId] = useState<string>('0');
  const navigation = useNavigation<any>();
  const pressMemberHandler = (id: number) => {
    setModalUserId(id.toString());
    setIsVisible(true);
  };

  const pressMemberListHandler = () => {
    navigation.navigate('GroupMember', {groupId: groupId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <View style={styles.leaderBox}>
          {leader && leader.profile ? (
            <Pressable
              style={styles.leaderItem}
              onPress={() => pressMemberHandler(leader.id)}>
              <Image source={{uri: leader.profile}} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => pressMemberHandler(leader.id)}
              style={[styles.leaderItem, {backgroundColor: Colors.grey4}]}
            />
          )}
        </View>
        <View style={styles.memberBox}>
          {members.map((el, index) => (
            <Pressable
              onPress={() => pressMemberHandler(el.id)}
              key={index}
              style={[
                styles.memberItem,
                {
                  left: index * -10,
                  zIndex: index,
                  backgroundColor: Colors.memberColor[index % 9],
                },
              ]}>
              {el.profile && <Image source={{uri: el.profile}} />}
            </Pressable>
          ))}
        </View>
        <UserInfoModal
          userId={modalUserId}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </View>
      <Pressable onPress={pressMemberListHandler}>
        <Ionicons
          name={'chevron-forward-outline'}
          color={Colors.primary500}
          size={25}
        />
      </Pressable>
    </View>
  );
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
  leftBox: {
    flexDirection: 'row',
    gap: 30,
  },
  leaderBox: {},
  leaderItem: {
    width: 42,
    height: 42,
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

export default LeaderMemberItem;
