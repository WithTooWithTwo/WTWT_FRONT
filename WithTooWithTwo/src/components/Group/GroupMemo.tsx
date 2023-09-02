import {fetchGroup, GroupType, NoticeType, storeMemo} from '../../util/group';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constants/styles';
import RenderGroupItem from './RenderGroupItem';

const GroupMemo = ({
  groupId,
  memos,
  setGroup,
}: {
  groupId: string;
  memos: NoticeType[];
  setGroup: (group: GroupType) => void;
}) => {
  const [newMemo, setNewMemo] = useState<string>('');
  const changeMemoHandler = (text: string) => {
    setNewMemo(text);
  };

  const submitMemoHandler = async () => {
    try {
      const response = await storeMemo(groupId, newMemo);
      fetchGroup(response.result).then(res => {
        setGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setNewMemo('');
  };

  return (
    <View style={styles.placeBox}>
      <View style={styles.placeTitle}>
        <Text style={styles.placeTitleText}>가고싶은 여행지</Text>
      </View>
      <View style={styles.memoContent}>
        {
          <RenderGroupItem
            type="memo"
            groupId={groupId}
            lists={memos}
            setGroup={setGroup}
          />
        }
        <TextInput
          value={newMemo}
          style={styles.memoInput}
          placeholder="더 추가하기"
          onChangeText={changeMemoHandler}
          onBlur={submitMemoHandler}
          blurOnSubmit={true}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={{paddingBottom: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  placeBox: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  placeTitle: {
    backgroundColor: '#FFF',
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
  },
  placeTitleText: {
    color: Colors.primary500,
    fontSize: 14,
    fontWeight: '600',
  },
  placeContent: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopEndRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  placeItem: {
    marginRight: 13,
  },
  placeImage: {
    width: 140,
    height: 80,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  placeText: {
    fontSize: 13,
    fontWeight: '400',
  },
  memoContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 100,
    borderTopEndRadius: 6,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
  },
  memoItem: {
    fontSize: 14,
    marginBottom: 10,
  },
  memoInput: {
    fontSize: 14,
    color: Colors.grey9,
    fontWeight: '400',
  },
});

export default GroupMemo;
