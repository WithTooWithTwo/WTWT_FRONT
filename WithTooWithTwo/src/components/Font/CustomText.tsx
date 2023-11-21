import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

const CustomText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: TextStyle;
}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard-Regular', // Use your custom font here
  },
});

export default CustomText;
