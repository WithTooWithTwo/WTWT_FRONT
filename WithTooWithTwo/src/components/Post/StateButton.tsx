import {StyleSheet, Text, View} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/styles';

function StateButton({state}: {state: string}) {
  if (state === 'thunder') {
    return (
      <View style={styles.container}>
        <MaterialIcons name="bolt" color={Colors.primary500} size={18} />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 77,
    height: 27,
    paddingRight: 3,
    borderRadius: 8,
    backgroundColor: Colors.grey1,
  },
  text: {
    color: '#3C70FF',
    marginLeft: 3,
    fontSize: 10,
    fontWeight: '500',
  },
});

export default StateButton;
