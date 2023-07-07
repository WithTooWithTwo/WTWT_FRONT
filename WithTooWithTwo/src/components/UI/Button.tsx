import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';

import {Colors} from '../../constants/styles';
import React from 'react';

function Button({
  style,
  children,
  onPress,
}: {
  style: ViewStyle;
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, style, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 65,
    paddingVertical: 20,
    backgroundColor: '#3C70FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    color: 'white',
  },
});

export default Button;
