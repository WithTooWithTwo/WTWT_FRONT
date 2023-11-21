import {StyleSheet, Text, View} from 'react-native';

function NewsItem() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>독일여행팟 일정이 10일 남았어요!</Text>
        <Text style={styles.views}>10시간 전</Text>
      </View>
      <Text style={styles.content}>독일여행팟 일정이 10일 남았어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'grey',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
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
    color: '#B5B5B5',
  },
});

export default NewsItem;
