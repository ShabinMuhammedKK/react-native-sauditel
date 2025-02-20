import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';

const OtpInputB0x = ({index, onOtpInput, onSubmit}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[styles.inputFields, isFocused && {borderColor: '#3a81fc'}]}
      maxLength={1}
      color={'#000'}
      textAlign="center"
      fontSize={32}
      fontWeight="bold"
      inputMode="numeric"
      onChangeText={value => onOtpInput(index, value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onSubmitEditing={onSubmit}
      returnKeyType="done"
    />
  );
};

export default OtpInputB0x;

const styles = StyleSheet.create({
  inputFields: {
    height: '80%',
    width: 76,
    borderWidth: 2,
    borderColor: '#d6d4d4',
    borderRadius: 8,
  },
});
