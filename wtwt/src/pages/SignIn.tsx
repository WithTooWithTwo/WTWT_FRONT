import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useAppDispatch} from '../store';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');

      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );

      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림'); //
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{width: 260, height: 30}}
          source={require('../assets/logo_black.png')}
        />
      </View>
      <View style={styles.inputZone}>
        <View style={styles.textGroup}>
          <Text style={styles.textLabel}>이메일 주소</Text>
          <TextInput
            value={email}
            style={styles.textInput}
            placeholder="이메일을 입력해주세요"
            onChangeText={onChangeEmail}
            autoCapitalize="none"
            importantForAutofill="yes"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => {
              // 엔터시 비밀번호 창으로 이동하기
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false} //키보드 내려가지 않게 하려고
            clearButtonMode="while-editing"
          />
        </View>
        <View>
          <Text style={styles.textLabel}>비밀번호</Text>
          <TextInput
            value={password}
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요"
            autoCapitalize="none"
            onChangeText={onChangePassword}
            secureTextEntry
            importantForAutofill="yes"
            autoComplete="password"
            textContentType="password"
            ref={passwordRef}
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
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
    backgroundColor: '3C70FF',
  },
  joinButton: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: '#8A8A8A',
  },
});

export default SignIn;
