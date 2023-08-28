import {GroupMember} from '../../util/group';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/styles';

const MemberList = ({members}: {members: GroupMember[]}) => {
  return (
    <View style={styles.container}>
      {members.map((member, index) =>
        member.profile ? (
          <View key={member.id} style={[styles.memberItem]}>
            <Image source={{uri: member.profile}} />
          </View>
        ) : (
          <View
            key={member.id}
            style={[
              styles.memberItem,
              {backgroundColor: Colors.memberColor[index % 9]},
            ]}></View>
        ),
      )}
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
