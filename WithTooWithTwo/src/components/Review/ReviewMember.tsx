import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GroupMember} from '../../util/group';
import {useState} from 'react';
import {Colors} from '../../constants/styles';

const ReviewMember = ({
  members,
  onSelectMember,
}: {
  members: GroupMember[];
  onSelectMember: (selectedIndex: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectMember = (index: number) => {
    setSelectedIndex(index); // 선택된 멤버의 인덱스를 상태에 업데이트
    onSelectMember(index); // onSelectMember 함수 호출하여 인덱스 전달
  };

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {members.map((member: GroupMember, i) => (
        <MemberItem
          key={i}
          member={member}
          onSelect={() => handleSelectMember(i)} // 클릭 시, 인덱스 전달하는 함수 호출
          isSelected={selectedIndex === i} // 선택된 멤버인지 여부 확인
        />
      ))}
    </ScrollView>
  );
};

const MemberItem = ({
  member,
  onSelect,
  isSelected,
}: {
  member: GroupMember;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  return (
    <Pressable
      style={[styles.block, isSelected && styles.selectedBlock]}
      onPress={onSelect}>
      <View style={styles.image}></View>
      <Text style={[styles.nickname, isSelected && styles.selectedNickname]}>
        {member.nickname}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  block: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: Colors.grey1,
    borderWidth: 2,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: '#cbcbcb',
  },
  nickname: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.grey4,
  },
  selectedBlock: {
    backgroundColor: 'rgba(234,234,234,0.8)',
    borderColor: Colors.sub2,
    borderWidth: 2,
  },
  selectedNickname: {
    color: 'black',
  },
});

export default ReviewMember;
