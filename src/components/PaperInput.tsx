import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '@utils/theme';
import Text from '@components/Text'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    mode?: 'outlined' | 'flat'
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
            error={!!props.errorText}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            onChangeText={props.onChangeText}
            theme={{ colors: {
                primary: theme.colors.primary, 
                text:theme.colors.black,
            } }}
            style={styles.input}
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            mode={props.mode || 'outlined'}
            keyboardType={props.isNumber ? 'phone-pad' : 'default'}
            autoCapitalize={props.uppercase ? 'characters' : 'none'}
            secureTextEntry={props.isPassword ? state.hide : false}
        />
        {props.isPassword && 
          (<TouchableOpacity 
              style={styles.rightIcon} 
              onPress={():void => setState({hide: !state.hide})} >
                <Icon 
                  name={state.hide ? "eye-off" : "eye"} 
                  size={24} color={theme.colors.grey} />
          </TouchableOpacity>)}
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
    height:50
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  label:{
      color:'rgba(0, 0, 0, 0.54)'
  },
  rightIcon:{
    position:"absolute",
    right:16,
    top:38,
  }
});

export default memo(PaperInput);
