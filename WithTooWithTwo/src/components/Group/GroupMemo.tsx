import {fetchGroup, GroupType, NoticeType, storeMemo} from '../../util/group';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constants/styles';
import RenderGroupItem from './RenderGroupItem';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [toggle, setToggle] = useState<boolean>(false);
  const changeMemoHandler = (text: string) => {
    setNewMemo(text);
  };

  const submitMemoHandler = async () => {
    try {
      const response = await storeMemo(groupId, newMemo);
      fetchGroup(groupId).then(res => {
        setGroup(res);
      });
    } catch (e) {
      console.log(e);
    }
    setNewMemo('');
  };

  const pressToggle = () => {
    setToggle(prevState => !prevState);
  };

  return (
    <View style={styles.placeBox}>
      <View style={styles.placeTitle}>
        <Text style={styles.placeTitleText}>가고싶은 여행지</Text>
        <Pressable onPress={pressToggle}>
          <AntDesign name="pluscircle" color={Colors.primary500} size={17} />
        </Pressable>
      </View>
      <View style={styles.memoContent}>
        <RenderGroupItem
          type="memo"
          groupId={groupId}
          lists={memos}
          setGroup={setGroup}
        />
        <View style={!toggle && styles.none}>
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
    width: 145,
    padding: 10,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
  },
  placeTitleText: {
    color: Colors.primary500,
    fontSize: 13,
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
    paddingLeft: 20,
  },
  memoItem: {
    fontSize: 14,
    marginBottom: 10,
  },
  memoInput: {
    fontSize: 14,
    color: Colors.grey9,
    fontWeight: '400',
    paddingTop: 5,
  },
  none: {
    display: 'none',
  },
});

export default GroupMemo;
