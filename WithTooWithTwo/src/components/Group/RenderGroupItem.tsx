import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  deleteList,
  fetchGroup,
  GroupType,
  NoticeType,
  patchList,
} from '../../util/group';
import {Colors} from '../../constants/styles';

const RenderGroupItem = ({
  type,
  groupId,
  lists,
  setGroup,
}: {
  type: string;
  groupId: string;
  lists: NoticeType[];
  setGroup: (group: GroupType) => void;
}) => {
  const [noticeList, setNoticeList] = useState<string[]>([]);

  useEffect(() => {
    setNoticeList(lists.map(n => n.data));
  }, [lists]);

  const changeListHandler = (text: string, index: number) => {
    setNoticeList(prevState => {
      const updated = [...prevState];
      updated[index] = text;
      return updated;
    });
  };

  const patchListHandler = async (id: number, index: number) => {
    try {
      const response = await patchList(type, groupId, id, noticeList[index]);
      fetchGroup(groupId).then(res => {
        // setGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteListHandler = async (id: number) => {
    const deleteItem = async () => {
      try {
        const response = await deleteList(type, groupId, id);
        fetchGroup(groupId).then(res => {
          setGroup(res);
        });
      } catch (e) {
        console.log(e);
      }
    };

    Alert.alert('삭제하시겠습니까?', '', [
      {
        text: '아니요', // 버튼 제목
        style: 'cancel',
      },
      {text: '네', onPress: () => deleteItem()},
    ]);
  };

  return (
    <>
      {noticeList.map((text, i) => (
        <View key={i} style={styles.container}>
          <TextInput
            style={styles.noticeItem}
            value={noticeList[i]}
            onChangeText={val => changeListHandler(val, i)}
            onBlur={() => patchListHandler(lists[i].id, i)}
          />
          <Pressable
            onPress={() => {
              deleteListHandler(lists[i].id);
            }}>
            <Text style={styles.deleteButton}>삭제</Text>
          </Pressable>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noticeItem: {
    fontSize: 14,
    marginBottom: 10,
  },
  deleteButton: {
    fontSize: 12,
    color: Colors.grey4,
  },
});

export default RenderGroupItem;
