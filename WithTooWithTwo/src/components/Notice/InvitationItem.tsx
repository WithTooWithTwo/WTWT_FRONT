import {Pressable, StyleSheet, Text, View} from 'react-native';
import {acceptInvitation, AlarmType} from '../../util/group';
import {detailDate} from '../../util/date';
import {Colors} from '../../constants/styles';

function InvitationItem({
  alarm,
  setReload,
}: {
  alarm: AlarmType;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pressAcceptButton = () => {
    acceptInvitation(alarm.id.toString()).then(r => {
      console.log(r);
      setReload(prevState => !prevState);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>그룹 초대</Text>
        <Text style={styles.views}>{detailDate(alarm.createdAt)}</Text>
      </View>
      <Text style={styles.content}>{alarm.message.slice(7)}</Text>
      <View style={styles.buttonBox}>
        <Pressable style={styles.button}>
          <Text>거절하기</Text>
        </Pressable>
        <Pressable style={styles.acceptButton} onPress={pressAcceptButton}>
          <Text style={{color: 'white'}}>수락하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 25,
    marginTop: 10,
    borderBottomColor: Colors.grey5,
    borderBottomWidth: 1,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  views: {
    fontWeight: '400',
    fontSize: 11,
    color: '#B5B5B5',
  },
  content: {
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 3,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 45,
    backgroundColor: '#F8F8F9',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  acceptButton: {
    paddingVertical: 13,
    paddingHorizontal: 45,
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 16,
  },
});

export default InvitationItem;
