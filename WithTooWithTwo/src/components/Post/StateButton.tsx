import {StyleSheet, Text, View} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function StateButton({state}: {state: string}) {
  if (state === 'thunder') {
    return (
      <View style={styles.container}>
        <FontAwesome name="bolt" color="#3C70FF" />
        <Text style={styles.text}>번개만남</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <EvilIcon name="spinner" color="#3C70FF" size={20} />
        <Text style={styles.text}>모집 중</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 73,
    height: 27,
    flexDirection: 'row',
    backgroundColor: '#F8F8F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#3C70FF',
    marginLeft: 5,
    fontSize: 10,
    fontWeight: '500',
  },
});

export default StateButton;
