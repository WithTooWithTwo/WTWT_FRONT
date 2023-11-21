import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AuthInput from '../../components/Auth/AuthInput';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {login, subscribe} from '../../util/auth';
import {authenticate} from '../../slices/authSlice';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {RootStackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
function LoginScreen({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEmail(enteredValue);
        break;
      case 'password':
        setPassword(enteredValue);
    }
  }
  const loginHandler = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(authenticate(token));
      // const sub = await subscribe();
      Alert.alert('알림', '로그인 되었습니다.');
    } catch (error) {
      Alert.alert('Login Failed!');
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, dispatch, email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{width: 260, height: 30}}
          source={require('../../assets/logo_black.png')}
        />
      </View>
      <View style={styles.inputZone}>
        <AuthInput
          label="이메일 입력"
          value={email}
          onUpdateValue={val => updateInputValueHandler('email', val)}
        />
        <AuthInput
          label="비밀번호 입력"
          value={password}
          onUpdateValue={val => updateInputValueHandler('password', val)}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={loginHandler}
          style={
            !canGoNext
              ? styles.loginButton
              : [styles.loginButton, styles.loginButtonActive]
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인 하기</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text style={styles.joinButton}>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 100,
  },
  logo: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    padding: 30,
    backgroundColor: '#D9D9D9',
  },

  inputZone: {
    marginBottom: 20,
  },
  textGroup: {
    marginBottom: 15,
  },
  textLabel: {
    paddingBottom: 5,
    color: '#707070',
  },
  textInput: {
    height: 55,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
  },
  buttonZone: {
    marginTop: 10,
  },
  loginButton: {
    height: 65,
    paddingVertical: 20,
    backgroundColor: '#3C70FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    color: 'white',
  },
  loginButtonActive: {
    backgroundColor: '#3C70FF',
  },
  joinButton: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: '#8A8A8A',
  },
});
export default LoginScreen;
