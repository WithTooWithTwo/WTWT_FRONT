import {ScrollView, StyleSheet} from 'react-native';
import {GroupMember} from '../../util/group';
import {useState} from 'react';
import ReviewMemberItem from './ReviewMemberItem';

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
        <ReviewMemberItem
          key={i}
          member={member}
          onSelect={() => handleSelectMember(i)} // 클릭 시, 인덱스 전달하는 함수 호출
          isSelected={selectedIndex === i} // 선택된 멤버인지 여부 확인
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default ReviewMember;
