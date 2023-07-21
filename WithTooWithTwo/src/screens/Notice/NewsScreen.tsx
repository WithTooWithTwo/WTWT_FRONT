import {StyleSheet, Text, View} from 'react-native';
import NewsItem from '../../components/Notice/NewsItem';

function NewsScreen() {
  return (
    <View style={styles.container}>
      <NewsItem />
      <NewsItem />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default NewsScreen;
