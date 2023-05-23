// 키보드가 보일 때 화면이 가려져서 안나오는 현상 해결하기 위해 사용하는 컴포넌트
// 자동 스크롤 되어서 가리지 않고 보이게 함

import React from 'react';
import {
    Keyboard,
    StyleProp,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

type Component = {
    style?: StyleProp<ViewStyle>; // 리액트 스타일 타입은 이렇게 작성함
    children: JSX.Element[] | JSX.Element;
};

// children 있는 컴포넌트는 FC 쓰는게 나음
const DismissKeyboardView: React.FC<Component> = ({children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView {...props} style={props.style}>
            {children}
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
