import React from 'react';
import {TextInput,StyleSheet,View, Text, Image} from 'react-native';
import { theme } from '../utils/theme';

type Ref = React.LegacyRef<TextInput> | undefined | null;
interface Props {
    isPassword?: boolean;
    isNumber?:boolean;
    uppercase?:boolean;
    errorText?:string;
    icon?: any;
    iconStyle?:any;
    style?:any;
    value:string;
    placeholder?:string;
    autoFocus?:boolean;
    onChangeText: (text: string) => void;
}

const CustomTextInput= React.forwardRef((props: Partial<Props>, ref?: Ref) => {
    const [state, setState] = React.useState({
        hide: true,
        focus:false
    });
    
    const dynamicStyle = { 
        paddingLeft: props.icon ? 60 : 25,
        borderColor: !!props.errorText ? theme.colors.error : theme.colors.defaultBorderColor,
    }

    const borderColor = state.focus && !props.errorText ? {borderColor:theme.colors.primary} : {}

    return (
        <View style={[styles.container, props.style]}>
            <View style={{flexDirection:"row"}}>
                {props.icon && <InputIcon source={props.icon} style={props.iconStyle} />}
                <TextInput 
                    ref={ref}
                    value={props.value}
                    placeholder={props.placeholder}
                    autoFocus={props.autoFocus}
                    onChangeText={props.onChangeText}
                    style={[styles.input, dynamicStyle, borderColor, props.style]}
                    onFocus={()=>setState({...state, focus:true})}
                    onBlur={()=>setState({...state, focus:false})}
                    keyboardType={props.isNumber ? 'phone-pad' : 'default'}
                    autoCapitalize={props.uppercase ? 'characters' : 'none'}
                    secureTextEntry={props.isPassword ? state.hide : false}
                />
            </View>
            {!!props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
        </View>
    );
});
const InputIcon = React.memo(({source,style}:any) => (
    <View style={styles.wrapIcon}>
        <Image source={source} style={[styles.icon,style]} /> 
    </View>
))

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:8
    },
    input:{
        ...theme.boxShadowStyle,
        borderColor:theme.colors.defaultBorderColor,
        backgroundColor:theme.colors.white,
        // fontFamily:"Poppins-Regular",
        color:theme.colors.black,
        paddingHorizontal:25,
        alignItems:"center",
        paddingVertical:10,
        borderRadius:10,
        borderWidth:1,
        fontSize:13,
        height:50,
        flex:1,
    },
    error: {
        color: theme.colors.error,
        paddingHorizontal: 4,
        fontSize: 14,
        paddingTop: 4,
    },
    wrapIcon:{
        zIndex:5,
        elevation:5,
    },
    icon:{
        zIndex:5,
        position: "absolute",
        resizeMode:"contain",
        width:35,
        height:26,
        left: 17,
        top:15,
        bottom:8,
    },
});


export default React.memo(CustomTextInput);
