import React, {useState} from 'react';
import {fetchGroup, GroupType, NoticeType, storeNotice} from '../../util/group';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../constants/styles';

const GroupNotice = ({
  groupId,
  notices,
  setGroup,
}: {
  groupId: string;
  notices: NoticeType[];
  setGroup: (group: GroupType) => void;
}) => {
  const [newNotice, setNewNotice] = useState<string>('');
  const changeNoticeHandler = (text: string) => {
    setNewNotice(text);
  };
  const submitNoticeHandler = async () => {
    try {
      const response = await storeNotice(groupId, newNotice);
      fetchGroup(response.result).then(res => {
        setGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setNewNotice('');
  };

  return (
    <View style={styles.noticeBox}>
      <Text style={styles.noticeTitle}>NOTICE</Text>
      <View style={styles.noticeList}>
        {notices.map(el => (
          <Text key={el.id} style={styles.noticeItem}>
            {el.data}
          </Text>
        ))}
        <TextInput
          value={newNotice}
          style={styles.noticeInput}
          placeholder="더 추가하기"
          onChangeText={changeNoticeHandler}
          onBlur={submitNoticeHandler}
          blurOnSubmit={true}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey1,
    borderRadius: 5,
  },
  noticeTitle: {
    color: Colors.primary500,
    fontSize: 14,
    marginBottom: 10,
  },
  noticeList: {
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  noticeItem: {
    fontSize: 14,
    marginBottom: 10,
  },
  noticeInput: {
    fontSize: 13,
    color: Colors.grey9,
    fontWeight: '400',
  },
});

export default GroupNotice;
