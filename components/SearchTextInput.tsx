import React from 'react';
import {ColorValue, StyleProp, TextInput, TextStyle} from 'react-native';

interface Props {
  placeholderText: string | undefined;
  placeholderTextColor: ColorValue | undefined;
  textInputValue: string;
  onType: ((text: string) => void) | undefined;
  TextInputStyle: StyleProp<TextStyle>;
}

const SearchTextInput: React.FC<Props> = ({
  placeholderText,
  placeholderTextColor,
  textInputValue,
  onType,
  TextInputStyle,
}: Props) => {
  return (
    <TextInput
      placeholder={placeholderText}
      placeholderTextColor={placeholderTextColor}
      value={textInputValue}
      onChangeText={onType}
      style={TextInputStyle}
    />
  );
};
export default SearchTextInput;
