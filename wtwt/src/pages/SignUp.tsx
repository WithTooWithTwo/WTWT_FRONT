import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

let ScreenWidth = Dimensions.get('window').width;

function SignIn({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('FEMALE');
  const [bYear, setBYear] = useState(0);
  const [bMonth, setBMonth] = useState(0);
  const [bDay, setBDay] = useState(0);
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const [date, onChangeDate] = useState(new Date()); // 선택 날짜
  const [mode, setMode] = useState('date'); // 모달 유형
  const [visible, setVisible] = useState(false); // 모달 노출 여부

  const onPressTime = () => {
    // 시간 클릭 시
    setMode('time'); // 모달 유형을 time으로 변경
    setVisible(true); // 모달 open
  };
  const onPressDate = () => {
    // 날짜 클릭 시
    setMode('date'); // 모달 유형을 date로 변경
    setVisible(true); // 모달 open
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  const onConfirm = (selectedDate: Date) => {
    // 날짜 또는 시간 선택 시
    setVisible(false); // 모달 close
    onChangeDate(selectedDate); // 선택한 날짜 변경
    onChangeBYear(selectedDate.getFullYear());
    onChangeBMonth(selectedDate.getMonth() + 1);
    onChangeBDay(selectedDate.getDate());
  };

  const nameRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  const phoneRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const checkPwdRef = useRef<TextInput | null>(null);

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangeNickname = useCallback((text: string) => {
    setNickname(text.trim());
  }, []);
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangePhone = useCallback((text: string) => {
    setPhone(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);
  const onChangeCheckPwd = useCallback((text: string) => {
    setCheckPwd(text.trim());
  }, []);
  const onChangeBYear = useCallback((text: number) => {
    setBYear(text);
  }, []);
  const onChangeBMonth = useCallback((text: number) => {
    setBMonth(text);
  }, []);
  const onChangeBDay = useCallback((text: number) => {
    setBDay(text);
  }, []);
  const onChangeStatusMessage = useCallback((text: string) => {
    setStatusMessage(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력하세요');
    }
    if (!nickname || !nickname.trim()) {
      return Alert.alert('알림', '닉네임을 입력하세요');
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      return Alert.alert('알림', '휴대폰 번호를 입력하세요');
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    if (!checkPwd || !checkPwd.trim()) {
      console.log(password);
      return Alert.alert('알림', '비밀번호 확인을 입력해주세요');
    }

    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    if (password !== checkPwd) {
      return Alert.alert('알림', '비밀번호가 일치하지 않습니다');
    }
    // console.log(date);
    console.log(
      name,
      nickname,
      gender,
      bYear,
      bMonth,
      bDay,
      phoneNumber,
      email,
      password,
      checkPwd,
    );

    try {
      setLoading(true);
      console.log(Config.API_URL);
      const response = await axios.post(
        `${Config.API_URL}`,
        {
          name,
          phoneNumber,
          email,
          password,
          nickname,
          statusMessage,
          gender,
          bYear,
          bMonth,
          bDay,
        },
        //{headers : {}}
      );
      console.log(response);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error();
      if (errorResponse) {
        //Alert.alert('알림', (errorResponse.data as any).data.massage);
      }
    } finally {
      setLoading(false);
      navigation.navigate('SignIn');
    }
  }, [
    loading,
    name,
    nickname,
    phoneNumber,
    email,
    password,
    checkPwd,
    navigation,
  ]);

  const canGoNext =
    name && nickname && phoneNumber && email && password && checkPwd;

  return (
    <>
      <ScrollView>
        <DismissKeyboardView style={styles.container}>
          <View style={styles.titleZone}>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View style={styles.inputZone}>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>이름</Text>
              <TextInput
                value={name}
                style={styles.textInput}
                placeholder="이름을 입력해주세요"
                onChangeText={onChangeName}
                importantForAutofill="yes"
                autoCapitalize="none"
                autoComplete="name"
                //keyboardType="email-address"
                textContentType="name"
                returnKeyType="next"
                ref={nameRef}
                onSubmitEditing={() => {
                  // 엔터시 비밀번호 창으로 이동하기
                  nicknameRef.current?.focus();
                }}
                blurOnSubmit={false} //키보드 내려가지 않게 하려고
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>휴대폰 번호</Text>
              <TextInput
                value={phoneNumber}
                style={styles.textInput}
                placeholder="휴대폰 번호를 입력해주세요"
                onChangeText={onChangePhone}
                importantForAutofill="yes"
                keyboardType="numbers-and-punctuation"
                // autoComplete="password"
                returnKeyType="next"
                ref={phoneRef}
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
                blurOnSubmit={false} //키보드 내려가지 않게 하려고
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>이메일</Text>
              <TextInput
                value={email}
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="이메일을 입력해주세요"
                onChangeText={onChangeEmail}
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
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>비밀번호</Text>
              <TextInput
                value={password}
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="비밀번호를 입력해주세요"
                onChangeText={onChangePassword}
                secureTextEntry
                returnKeyType="next"
                importantForAutofill="yes"
                autoComplete="password"
                textContentType={'oneTimeCode'}
                blurOnSubmit={false}
                ref={passwordRef}
                onSubmitEditing={() => {
                  // 엔터시 비밀번호 창으로 이동하기
                  checkPwdRef.current?.focus();
                }}
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>비밀번호 확인</Text>
              <TextInput
                value={checkPwd}
                style={styles.textInput}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                onChangeText={onChangeCheckPwd}
                autoCapitalize="none"
                secureTextEntry
                blurOnSubmit={false}
                returnKeyType="send"
                importantForAutofill="yes"
                autoComplete="password"
                textContentType={'oneTimeCode'}
                ref={checkPwdRef}
                clearButtonMode="while-editing"
                //onSubmitEditing={onSubmit}
              />
            </View>
            <View style={styles.space}></View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>닉네임</Text>
              <TextInput
                value={nickname}
                style={styles.textInput}
                placeholder="닉네임을 입력해주세요"
                onChangeText={onChangeNickname}
                autoCapitalize="none"
                importantForAutofill="yes"
                //autoComplete="password"
                //textContentType="password"
                ref={nicknameRef}
                onSubmitEditing={() => {
                  // 엔터시 비밀번호 창으로 이동하기
                  phoneRef.current?.focus();
                }}
                blurOnSubmit={false} //키보드 내려가지 않게 하려고
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>한줄 소개</Text>
              <TextInput
                value={statusMessage}
                style={styles.textInput}
                placeholder="간단한 인삿말을 입력해주세요"
                onChangeText={onChangeStatusMessage}
                importantForAutofill="yes"
                autoCapitalize="none"
                autoComplete="name"
                textContentType="name"
                returnKeyType="next"
                ref={nameRef}
                onSubmitEditing={() => {
                  // 엔터시 비밀번호 창으로 이동하기
                  nicknameRef.current?.focus();
                }}
                blurOnSubmit={false} //키보드 내려가지 않게 하려고
                clearButtonMode="while-editing"
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>성별</Text>
              <View style={styles.radio}>
                <View style={styles.radioBox}>
                  <RadioButton
                    value="FEMALE"
                    status={gender === 'FEMALE' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('FEMALE')}
                  />
                  <Text style={styles.radioText}>여자</Text>
                </View>
                <View style={styles.radioBox}>
                  <RadioButton
                    value="MALE"
                    status={gender === 'MALE' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('MALE')}
                  />
                  <Text style={styles.radioText}>남자</Text>
                </View>
                <View style={styles.radioBox}>
                  <RadioButton
                    value="HIDE"
                    status={gender === 'HIDE' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('HIDE')}
                  />
                  <Text style={styles.radioText}>선택 안함</Text>
                </View>
              </View>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.textLabel}>생년월일</Text>
              <Pressable onPress={onPressDate}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>
                    {date.getFullYear()} - {date.getMonth() + 1} -{' '}
                    {date.getDate()}
                  </Text>
                </View>
              </Pressable>

              <DateTimePickerModal
                isVisible={visible}
                onConfirm={onConfirm}
                onCancel={onCancel}
                date={date}
              />
            </View>
          </View>
        </DismissKeyboardView>
      </ScrollView>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : [styles.loginButton, styles.loginButtonActive]
          }
          disabled={!canGoNext || loading}>
          {loading ? (
            <ActivityIndicator color="blue" />
          ) : (
            <Text style={styles.loginButtonText}>회원가입 하기</Text>
          )}
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 120,
  },
  titleZone: {
    height: 150,
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  inputZone: {
    marginBottom: 0,
  },
  textGroup: {
    marginBottom: 20,
  },
  textLabel: {
    paddingBottom: 7,
    color: '#707070',
  },
  textInput: {
    height: 55,
    paddingLeft: 10,
    backgroundColor: '#EFEFEF',
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#EFEFEF',
  },
  dateText: {
    color: '#707070',
  },
  buttonZone: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    width: ScreenWidth,
    backgroundColor: 'white',
  },
  loginButton: {
    height: 65,
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    margin: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonActive: {
    backgroundColor: 'skyblue',
  },
  radio: {
    flexDirection: 'row',
    paddingVertical: 7,
    justifyContent: 'space-between',
  },
  radioBox: {
    flexDirection: 'row',
  },
  radioText: {
    paddingTop: 10,
    paddingHorizontal: 7,
    marginLeft: 10,
    marginRight: 5,
    color: '#707070',
  },
  birthdayGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  birthdayInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: '#EFEFEF',
  },
  space: {
    height: 100,
  },
});

export default SignIn;
