import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AuthInputParamList = {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onUpdateValue: (v: string) => void;
  isInvalid?: boolean;
  ref?: React.MutableRefObject<TextInput | null>;
  nextRef?: React.MutableRefObject<TextInput | null>;
  secureTextEntry?: boolean;
};

function AuthInput({
  label,
  keyboardType,
  value,
  onUpdateValue,
  isInvalid,
  //ref,
  //nextRef,
  secureTextEntry = false,
}: AuthInputParamList) {
  return (
    <View style={styles.textGroup}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput
        value={value}
        style={styles.textInput}
        placeholder={`${label}을 입력해주세요`}
        onChangeText={onUpdateValue}
        autoCapitalize="none"
        importantForAutofill="yes"
        // autoComplete="email"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        // textContentType="emailAddress"
        returnKeyType="next"
        // ref={ref}
        // onSubmitEditing={() => {
        //   // 엔터시 비밀번호 창으로 이동하기
        //   nextRef?.current?.focus(); // 다시 확인
        // }}
        blurOnSubmit={false} //키보드 내려가지 않게 하려고
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default AuthInput;
