import {GroupMember} from '../../util/group';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {useState} from 'react';
import UserInfoModal from './UserInfoModal';

const MemberList = ({
  leader,
  members,
}: {
  leader: GroupMember;
  members: GroupMember[];
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalUserId, setModalUserId] = useState<string>('0');

  const pressMemberHandler = (id: number) => {
    setModalUserId(id.toString());
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      {leader.profile ? (
        <Pressable
          key={leader.id}
          style={[styles.memberItem]}
          onPress={() => pressMemberHandler(leader.id)}>
          <Image source={{uri: leader.profile}} />
        </Pressable>
      ) : (
        <Pressable
          key={leader.id}
          onPress={() => pressMemberHandler(leader.id)}
          style={[
            styles.memberItem,
            {
              backgroundColor: Colors.grey2,
            },
          ]}>
          <Image
            source={require('../../assets/wtwt_logo_image2.png')}
            style={{width: 18, height: 10}}
          />
        </Pressable>
      )}
      {members.map((member, index) =>
        member.profile ? (
          <Pressable
            key={member.id}
            style={[styles.memberItem]}
            onPress={() => pressMemberHandler(member.id)}>
            <Image source={{uri: member.profile}} />
          </Pressable>
        ) : (
          <Pressable
            key={member.id}
            onPress={() => pressMemberHandler(member.id)}
            style={[
              styles.memberItem,
              {
                backgroundColor: Colors.memberColor[index % 9],
                left: index * -7 + -7,
              },
            ]}>
            <Image
              source={require('../../assets/wtwt_logo_image2.png')}
              style={{width: 18, height: 10}}
            />
          </Pressable>
        ),
      )}
      <UserInfoModal
        userId={modalUserId}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  memberItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default MemberList;
