import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import React, {useCallback, useRef, useState} from 'react';
import {createUser} from '../../util/auth';
import {useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DismissKeyboardView from '../../components/UI/DismissKeyboardView';
import AuthInput from '../../components/Auth/AuthInput';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RadioButton} from 'react-native-paper';
import OneImagePicker from '../../components/Image/OneImagePicker';
import {ImageType} from '../../slices/postsSlice';
import {Colors} from '../../constants/styles';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

let ScreenWidth = Dimensions.get('window').width;
function SignUpScreen({navigation}: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('FEMALE');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [profileImage, setProfileImage] = useState<ImageType>();

  const nameRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  const phoneRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const checkPwdRef = useRef<TextInput | null>(null);

  const [date, setDate] = useState(new Date()); // 선택 날짜
  const [mode, setMode] = useState('date'); // 모달 유형
  const [visible, setVisible] = useState(false); // 모달 노출 여부

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const updateInputValueHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'email':
        setEmail(enteredValue.trim());
        break;
      case 'password':
        setPassword(enteredValue.trim());
        break;
      case 'name':
        setName(enteredValue.trim());
        break;
      case 'nickname':
        setNickname(enteredValue.trim());
        break;
      case 'gender':
        setGender(enteredValue.trim());
        break;
      case 'phoneNumber':
        setPhone(enteredValue.trim());
        break;
      case 'checkPwd':
        setCheckPwd(enteredValue.trim());
        break;
      case 'statusMessage':
        setStatusMessage(enteredValue.trim());
        break;
    }
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
    setDate(selectedDate); // 선택한 날짜 변경
  };

  const setImageHandler = (image: ImageType) => {
    setProfileImage(image);
    console.log(image);
  };

  const SignUpHandler = useCallback(async () => {
    console.log(profileImage);
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

    const value = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      nickname: nickname,
      statusMessage: statusMessage,
      gender: gender,
      bYear: date.getFullYear(),
      bMonth: date.getMonth() + 1,
      bDay: date.getDay(),
      profileImage: profileImage,
    };
    console.log(value);

    try {
      setIsAuthenticating(true);
      const token = await createUser(value);
      //dispatch(authenticate(token));
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Failed!');
      setIsAuthenticating(false);
    }
  }, [
    isAuthenticating,
    dispatch,
    email,
    password,
    nickname,
    phoneNumber,
    gender,
    statusMessage,
    checkPwd,
    navigation,
  ]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    setScrollPosition(contentOffset.y);
  };

  const handleKeyboardSubmit = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  };

  const handleScrollUp = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0});
    }
  };

  const canGoNext =
    name && nickname && phoneNumber && email && password && checkPwd;

  return (
    <>
      <KeyboardAvoidingView>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <DismissKeyboardView style={styles.container}>
            <View style={styles.inputZone}>
              <AuthInput
                label="이름"
                value={name}
                onUpdateValue={val => updateInputValueHandler('name', val)}
                //ref={nameRef}
              />
              <AuthInput
                label="휴대폰 번호"
                value={phoneNumber}
                onUpdateValue={val =>
                  updateInputValueHandler('phoneNumber', val)
                }
                keyboardType="numbers-and-punctuation"
                //ref={phoneRef}
              />
              <AuthInput
                label="이메일"
                value={email}
                onUpdateValue={val => updateInputValueHandler('email', val)}
                // ref={emailRef}
                keyboardType="email-address"
              />
              <AuthInput
                label="비밀번호"
                value={password}
                onUpdateValue={val => updateInputValueHandler('password', val)}
                // ref={passwordRef}
                secureTextEntry={true}
              />
              <AuthInput
                label="비밀번호 확인"
                value={checkPwd}
                onUpdateValue={val => updateInputValueHandler('checkPwd', val)}
                //ref={checkPwdRef}
                secureTextEntry={true}
              />

              <View style={styles.space}></View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 40,
                }}>
                {profileImage === undefined ? (
                  <OneImagePicker
                    style={styles.imageCircle}
                    onSetImages={setImageHandler}
                  />
                ) : (
                  <Image
                    source={{uri: `${profileImage.uri}`}}
                    style={styles.imageCircle}
                  />
                )}
              </View>

              <AuthInput
                label="닉네임"
                value={nickname}
                onUpdateValue={val => updateInputValueHandler('nickname', val)}
                //ref={nicknameRef}
              />
              <AuthInput
                label="한줄 소개"
                value={statusMessage}
                onUpdateValue={val =>
                  updateInputValueHandler('statusMessage', val)
                }
                // ref={nicknameRef}
              />

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
                    <Text style={styles.radioText}>비공개</Text>
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
              <View style={{paddingBottom: 10}} />
            </View>
          </DismissKeyboardView>
        </ScrollView>
        <View style={styles.titleZone}>
          <Text style={styles.title}>회원가입</Text>
          <View style={styles.scrollBox}>
            <Pressable
              onPress={handleScrollUp}
              style={[
                styles.circle,
                {
                  backgroundColor:
                    scrollPosition >= styles.circle.height / 2
                      ? '#D9D9D9'
                      : '#3B70FF',
                },
              ]}
            />
            <View style={styles.circleLine}></View>
            <Pressable
              onPress={handleKeyboardSubmit}
              style={[
                styles.circle,
                {
                  backgroundColor:
                    scrollPosition >= styles.circle.height / 2
                      ? '#3B70FF'
                      : '#D9D9D9',
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.buttonZone}>
          <Pressable
            onPress={SignUpHandler}
            style={
              !canGoNext
                ? styles.loginButton
                : [styles.loginButton, styles.loginButtonActive]
            }
            disabled={!canGoNext || isAuthenticating}>
            {isAuthenticating ? (
              <ActivityIndicator color="blue" />
            ) : (
              <Text style={styles.loginButtonText}>회원가입 하기</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 100,
    marginBottom: 30,
    paddingTop: 170,
  },
  titleZone: {
    height: 150,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: ScreenWidth,
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingTop: 50,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  circleLine: {
    width: 30,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  scrollBox: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 3,
    paddingLeft: 10,
    backgroundColor: Colors.grey6,
    borderRadius: 10,
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: Colors.grey6,
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
    backgroundColor: '#3C70FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 20,
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
    backgroundColor: Colors.grey6,
  },
  space: {
    height: 280,
  },
  imageCircle: {
    borderRadius: 100,
    backgroundColor: Colors.grey6,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignUpScreen;
