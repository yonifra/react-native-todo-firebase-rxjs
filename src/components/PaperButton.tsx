import React, { memo, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '@utils/theme';

interface Props {
    mode?: 'outlined' | 'text' | 'contained';
    onPress?:  (() => void) | undefined
    children?: ReactNode | null | string;
    style?: StyleProp<ViewStyle>;
    loading?:boolean;
}

const Button: React.FC<Props> = (props) => (
  <PaperButton
    style={[
      styles.button,
      { backgroundColor: props.loading ? "#F0F0F0" : "#ffd34d" },
        props.mode === 'outlined' && { 
            backgroundColor: theme.colors.surface, 
            borderColor: "rgba(0, 0, 0, 0.23)" },
        props.mode === 'text' && { 
            backgroundColor: 'transparent', 
        },
        props.style,
    ]}
    theme={{
      colors:{
        primary:theme.colors.primary
      }
    }}
    labelStyle={[styles.text, !props.loading && props.mode === 'outlined' && { color: "#ffd34d" }]}
    mode={props.mode}
    disabled={props.loading}
    onPress={props.onPress}
    uppercase={false}>
    {props.children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    height:44
  },
  text: {
    // fontWeight: 'bold',
    // fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
