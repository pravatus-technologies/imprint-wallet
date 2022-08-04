/**
 * A Phrase control renders a single word in an array of generated Mnemonic words. It can have two modes:
 *
 * 1. Generated mode - when a Mnemonic is generated and need to be displayed to the user.
 *  - Not editable
 * 2. Enter mode - when a user enters a word during account restoration/recovery.
 *  - Editable
 * 3. Verify mode - both Generated and Enter mode would enter this final phase. Only a randomized set of 6 words
 * will enter this mode. Maybe put that in the datastructure instead of control.
 *
 *
 * Proposed interface for generated mnemonics
 *
 * order => number
 * phrase => string
 * verify => boolean
 * validated => boolean
 */
import React, { useState, useCallback } from "react";
import {
  ColorValue,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "../hooks";

export interface IPhrase extends TextInputProps {
  id?: string;
  style?: TextStyle;
  color?: ColorValue;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
  order?: number;
  phrase?: string;
  verify?: boolean;
  validated?: boolean;
  disabled?: boolean;
  onFocus?: any;
  onBlur?: any;
}

const Phrase = ({
  id,
  style,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  color,
  order,
  phrase,
  verify,
  validated,
  disabled,
  onFocus,
  onBlur,
  ...props
}: IPhrase) => {
  const { assets, colors, sizes } = useTheme();
  const [isFocused, setFocused] = useState(false);

  const colorIndex = primary
    ? "primary"
    : secondary
    ? "secondary"
    : tertiary
    ? "tertiary"
    : black
    ? "black"
    : white
    ? "white"
    : gray
    ? "gray"
    : danger
    ? "danger"
    : warning
    ? "warning"
    : success
    ? "success"
    : info
    ? "info"
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : colors.gray;

  const inputContainerStyles = StyleSheet.flatten([
    {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 165,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 5,
    },
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: "100%",
      fontSize: sizes.p,
      color: colors.input,
      paddingHorizontal: sizes.inputPadding,
      padding: 15
    },
  ]) as TextStyle;

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur]
  );

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <View style={inputContainerStyles}>
      {order && <Text style={{ padding: 5, color: colors.input }}>{order}</Text>}
      <TextInput
        {...inputID}
        {...props}
        style={inputStyles}
        editable={!disabled}
        placeholderTextColor={inputColor}
        onFocus={(event) => handleFocus(event, true)}
        onBlur={(event) => handleFocus(event, false)}
      >
        {phrase}
      </TextInput>
      {danger && assets.warning && (
        <Image
          source={assets.warning}
          style={{
            marginRight: sizes.s,
            tintColor: colors.danger,
          }}
        />
      )}
      {success && assets.check && (
        <Image
          source={assets.check}
          style={{
            width: 12,
            height: 9,
            marginRight: sizes.s,
            tintColor: colors.success,
          }}
        />
      )}
    </View>
  );
};

export default React.memo(Phrase);
