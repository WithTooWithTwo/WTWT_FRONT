import {GroupMember} from '../../util/group';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/styles';
import {useState} from 'react';
import UserInfoModal from './UserInfoModal';

const MemberList = ({members}: {members: GroupMember[]}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalUserId, setModalUserId] = useState<string>('0');

  const pressMemberHandler = (id: number) => {
    setModalUserId(id.toString());
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
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
              {backgroundColor: Colors.memberColor[index % 9]},
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
    gap: 10,
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
