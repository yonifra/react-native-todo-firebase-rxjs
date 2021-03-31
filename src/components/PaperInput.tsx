import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '@utils/theme';
import Text from '@components/Text'

interface Props {
    mode?:'outlined' | 'flat'
    isPassword?: boolean;
    isNumber?:boolean;
    uppercase?:boolean;
    errorText?:string;
    style?:StyleProp<TextStyle>;
    label:string;
    value:string;
    placeholder?:string;
    autoFocus?:boolean;
    onChangeText?: ((text: string) => void);
}

const PaperInput: React.FC<Props> = (props) => {

    const [state, setState] = React.useState({
        hide: true,
    });
    
    return (
    <View style={styles.container}>
        {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
        <Input
            value={props.value}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            onChangeText={props.onChangeText}
            theme={{ colors: {
                primary: theme.colors.primary, 
                text:theme.colors.black,
                // placeholder:"grey"
            } }}
            style={styles.input}
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            mode={props.mode || 'outlined'}
            keyboardType={props.isNumber ? 'phone-pad' : 'default'}
            autoCapitalize={props.uppercase ? 'characters' : 'none'}
            secureTextEntry={props.isPassword ? state.hide : false}
        />
        {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.white,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  label:{
      color:'rgba(0, 0, 0, 0.54)'
  }
});

export default memo(PaperInput);
