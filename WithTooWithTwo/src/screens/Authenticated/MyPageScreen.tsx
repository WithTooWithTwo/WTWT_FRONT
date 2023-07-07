import {View} from 'react-native';
import IconButton from '../../components/UI/IconButton';
import {useDispatch} from 'react-redux';
import {logout} from '../../slices/authSlice';

function MyPageScreen() {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <IconButton
        icon="exit"
        size={70}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
}

export default MyPageScreen;
