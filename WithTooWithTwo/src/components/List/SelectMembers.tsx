import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '../../constants/styles';
import React, {useState} from 'react';
import {checkIsUser} from '../../util/user';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectMembers = ({
  onClose,
  members,
  addMember,
  deleteMember,
}: {
  onClose: () => void;
  members: string[];
  addMember: (value: string) => void;
  deleteMember: (value: string) => void;
}) => {
  const [member, setMember] = useState<string>('');

  const changeMemberHandler = (text: string) => {
    setMember(text);
  };

  const plusMember = () => {
    const checkMember = async () => {
      try {
        const response = await checkIsUser(member);
        if (!response.isExist) {
          Alert.alert(
            '해당 유저가 존재하지 않습니다',
            '닉네임을 다시 확인해보세요',
          );
        } else {
          addMember(member);
        }
        setMember('');
      } catch (e) {
        console.log(e);
      }
    };
    checkMember();
  };

  return (
    <Pressable onPress={onClose} style={styles.background}>
      <TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerText}>멤버 추가</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputLabel}
                placeholder={'사용자 닉네임'}
                value={member}
                onChangeText={changeMemberHandler}
                autoCapitalize={'none'}
              />
              <Pressable onPress={plusMember}>
                <FontAwesome name="search" size={15} color={Colors.grey7} />
              </Pressable>
            </View>
            <View style={styles.memberBox}>
              {members.map((el, i) => {
                return (
                  <View style={styles.itemBox} key={i}>
                    <View style={styles.itemBlock}>
                      <View
                        style={[
                          styles.image,
                          {
                            backgroundColor: Colors.memberColor[i % 9],
                          },
                        ]}></View>
                      <Text style={styles.item}>{el}</Text>
                    </View>
                    <AntDesign
                      name="close"
                      size={15}
                      color={Colors.primary500}
                      onPress={() => deleteMember(el)}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(44,44,44,0.34)',
  },
  modal: {
    width: 330,
    height: 600,
    paddingHorizontal: 25,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    gap: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '600',
  },
  main: {},
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.grey11,
  },
  inputLabel: {
    fontSize: 14,
  },
  inputButton: {
    fontSize: 13,
    color: Colors.grey4,
  },
  memberBox: {
    marginTop: 10,
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 5,
  },
  itemBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 38,
  },
  item: {},
  caption: {
    color: Colors.grey6,
    fontSize: 12,
  },
});
export default SelectMembers;
