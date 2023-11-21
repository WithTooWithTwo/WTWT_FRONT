import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchAnotherUser, fetchUser, UserType} from '../../util/user';
import {Colors} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {AlarmType, GroupMember, inviteMember} from '../../util/group';

const UserInfoModal = ({
  userId,
  isVisible,
  setIsVisible,
  groupId,
  user,
}: {
  userId: string;
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  groupId?: number;
  user?: GroupMember;
}) => {
  const [userData, setUserData] = useState<UserType>({} as UserType);
  const navigation = useNavigation<any>();
  const closeModal = () => {
    setIsVisible(false);
  };

  const goToUserPage = () => {
    setIsVisible(false);
    navigation.navigate('UserPage', {userId: userId});
  };

  const inviteUser = () => {
    if (groupId) {
      inviteMember(groupId.toString(), userId).then(r => console.log(r.data));
      console.log('send invitation');
    }
  };

  useEffect(() => {
    fetchAnotherUser(userId).then(res => setUserData(res));
  }, [userId]);

  return (
    <SafeAreaView>
      <Modal
        style={styles.modalView}
        animationType={'fade'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}>
        <Pressable style={styles.background} onPress={closeModal}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.imageBox}>
                <View style={styles.image}>
                  {user && user.profile && (
                    <Image source={{uri: user.profile}} style={styles.image} />
                  )}
                </View>
                <Text style={styles.nickname}>{userData.nickname}</Text>
                <Text style={styles.status}>{userData.statusMessage}</Text>
              </View>
              <View style={styles.buttonBox}>
                <Pressable style={styles.button} onPress={goToUserPage}>
                  <Text style={styles.buttonText}>정보 보기</Text>
                </Pressable>
                {groupId && (
                  <Pressable style={styles.button} onPress={inviteUser}>
                    <Text style={styles.buttonText}>그룹 초대하기</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(44,44,44,0.34)',
  },
  modalContainer: {
    width: '100%',
    height: 250,
    padding: 27,
    backgroundColor: 'white',
  },
  imageBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: Colors.grey6,
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: Colors.grey4,
    marginBottom: 8,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    backgroundColor: Colors.primary500,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});

export default UserInfoModal;
