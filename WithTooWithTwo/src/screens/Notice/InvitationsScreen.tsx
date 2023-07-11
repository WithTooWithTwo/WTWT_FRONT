import {StyleSheet, View} from 'react-native';
import NewsItem from '../../components/Notice/NewsItem';
import InvitationItem from '../../components/Notice/InvitationItem';

function InvitationsScreen() {
  return (
    <View style={styles.container}>
      <InvitationItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default InvitationsScreen;
