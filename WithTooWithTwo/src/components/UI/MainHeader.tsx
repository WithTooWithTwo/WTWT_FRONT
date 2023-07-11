import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import NoticeScreen, {
  NoticeScreenParamList,
} from '../../screens/Notice/NoticeScreen';

function MainHeader({title}: {title: string}) {
  const navigation = useNavigation<any>();
  const goToNoticeHandler = () => {
    navigation.navigate('Notice');
  };
  return (
    <View style={styles.headerZone}>
      <Text style={styles.headerText}>{title} </Text>
      <Icon name="bell" size={25} color="#868B94" onPress={goToNoticeHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {},
  container: {},
  headerZone: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
});

export default MainHeader;
