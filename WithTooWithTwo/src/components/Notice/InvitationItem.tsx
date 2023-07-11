import {Pressable, StyleSheet, Text, View} from 'react-native';

function InvitationItem() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>그룹 초대</Text>
        <Text style={styles.views}>10시간 전</Text>
      </View>
      <Text style={styles.content}>000님의 독일 여행팟</Text>
      <View style={styles.buttonBox}>
        <Pressable style={styles.button}>
          <Text>거절하기</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>수락하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginTop: 10,
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
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 16,
  },
});

export default InvitationItem;
