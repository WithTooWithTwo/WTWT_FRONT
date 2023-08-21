import {SafeAreaView, StyleSheet, View} from 'react-native';
import ScreenHeader from '../../components/UI/ScreenHeader';
import {Colors} from '../../constants/styles';
import MyInfo from '../../components/MyPage/MyInfo';
import MyGroup from '../../components/MyPage/MyGroup';

const MyPageMainScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <ScreenHeader title="마이페이지" color={'white'} isGoBack={false} />
        <MyInfo />
        <MyGroup />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey1,
  },
});

export default MyPageMainScreen;
