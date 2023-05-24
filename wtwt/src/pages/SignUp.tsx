import React, {useCallback, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert, FlatList,
    Pressable, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from "axios";
import Config from "react-native-config";
import {RadioButton} from "react-native-paper";

type SignUnScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignIn({navigation}: SignUnScreenProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('MALE');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPwd, setCheckPwd] = useState('');

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


    const onSubmit = useCallback(async () => {
        if(loading){
            return;
        }
        if (!name || !name.trim()) {
            return Alert.alert('알림', '이름을 입력하세요');
        }
        if (!nickname || !nickname.trim()) {
            return Alert.alert('알림', '닉네임을 입력하세요');
        }
        if (!phone || !phone.trim()) {
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
        console.log(name, nickname, phone, email, password, checkPwd);

        try{
            setLoading(true);
            console.log(Config.API_URL);
            const response = await axios.post(`${Config.API_URL}`, {
                name, phone, email, password, nickname},
                //{headers : {}}
            )
            console.log(response);
            Alert.alert('알림', '회원가입 되었습니다.');
            navigation.navigate('SignIn');
        } catch (error){
            const errorResponse = (error as AxiosError).response;
            console.error();
            if(errorResponse){
                Alert.alert('알림', (errorResponse.data as any).data.massage);
            }
        } finally {
            setLoading(false);
        }

    }, [loading, name, nickname, phone, email, password, checkPwd, navigation]);

    const canGoNext = name && nickname && phone && email && password && checkPwd;

    return (
        <DismissKeyboardView style={styles.container}>
            <ScrollView>
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
                    <Text style={styles.textLabel}>성별</Text>
                    <View style={styles.radio}>
                            <RadioButton value="MALE"
                                         status={ gender === 'MALE' ? 'checked' : "unchecked"}
                                         onPress={() => setGender('MALE')} />
                            <Text style={styles.radioText}>남자</Text>
                            <RadioButton value="FEMALE"
                                         status={ gender === 'FEMALE' ? 'checked' : "unchecked"}
                                         onPress={() => setGender('FEMALE')} />
                            <Text style={styles.radioText}>여자</Text>
                            <RadioButton value="HIDE"
                                         status={ gender === 'HIDE' ? 'checked' : "unchecked"}
                                         onPress={() => setGender('HIDE')} />
                            <Text style={styles.radioText}>선택 안함</Text>

                    </View>
                    </View>
                <View style={styles.textGroup}>
                    <Text style={styles.textLabel}>휴대폰 번호</Text>
                    <TextInput
                        value={phone}
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
                        onSubmitEditing={onSubmit}
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
                    disabled={!canGoNext || loading}>
                    {loading ? <ActivityIndicator color="blue" /> :
                        <Text style={styles.loginButtonText}>회원가입 하기</Text>
                    }
                </Pressable>
            </View>
            </ScrollView>
        </DismissKeyboardView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: 'white',
        flex: 1,
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
    buttonZone: {},
    loginButton: {
        height: 60,
        justifyContent : 'center',
        backgroundColor: '#D9D9D9',
        marginTop: 20,
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
        flexDirection: "row",
        paddingVertical : 3
    },
    radioText: {
        paddingTop: 10,
        paddingHorizontal: 7,
        marginRight: 5,
        color: '#707070'
    }
});

export default SignIn;
