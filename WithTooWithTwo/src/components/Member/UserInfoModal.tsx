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

const UserInfoModal = ({
  userId,
  isVisible,
  setIsVisible,
}: {
  userId: string;
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
}) => {
  const [userData, setUserData] = useState<UserType>({} as UserType);
  const closeModal = () => {
    setIsVisible(false);
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
                  {userData.profileImage && (
                    <Image source={{uri: userData.profileImage.uri}} />
                  )}
                </View>
                <Text style={styles.nickname}>{userData.nickname}</Text>
                <Text style={styles.status}>{userData.statusMessage}</Text>
              </View>
              <View style={styles.buttonBox}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>정보 보기</Text>
                </Pressable>
                {/*<Pressable style={styles.button} disabled={true}>*/}
                {/*  <Text style={styles.buttonText}>채팅 하기</Text>*/}
                {/*</Pressable>*/}
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
