import React,{useState,useEffect} from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View, Keyboard} from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import { showErrorToast } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { setAuth } from '@store/actions/auth';
import TextInput from '@components/TextInput';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign"
import constants from '@constants';


function Login({navigation}: any) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState({text:'septianferi74@gmail.com', error: ''});
    const [password, setPassword] = useState({text:'123456', error: ''});
    const [isLoading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    async function onGoogleButtonPress() {
        await GoogleSignin.configure({
            ...constants.GoogleSigninConfigure,
            offlineAccess: false
        });
        const { idToken } = await GoogleSignin.signIn();
        
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        setLoading(true)
        auth().signInWithCredential(googleCredential)
        .then((response) => {
            dispatch(setAuth(response))
        })
        .catch(error => {
            showErrorToast(error.message);
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    const signInWithEmailAndPassword = (): void =>{
        setLoading(true)
        auth()
        .signInWithEmailAndPassword(email.text, password.text)
        .then((response) => {
            dispatch(setAuth(response))
        })
        .catch(error => {
            showErrorToast(error.message);
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
               behavior={Platform.OS==="ios" ? "padding" : "height"}
               >
                    <Text style={styles.title} type="bold" size={10}>Login</Text>

                    <TextInput 
                        value={email.text}
                        errorText={email.error}
                        placeholder="Type your email"
                        onChangeText={(text) => setEmail({...email, text}) }
                    />
                    <TextInput 
                        value={password.text}
                        errorText={password.error}
                        placeholder="Type your password"
                        onChangeText={(text) => setPassword({...password, text}) }
                        isPassword
                    />

                    <Button 
                        loading={isLoading} 
                        onPress={signInWithEmailAndPassword}>
                        <Text color="white" type="semibold">{isLoading?"Loading...":"Sign in"}</Text>
                    </Button>

                    <View style={[styles.row, {alignSelf:"center"}]}>
                        <Text style={styles.label}>Don’t have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.link}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
            {!isKeyboardVisible && (<View style={{marginTop:60}}>
                <View style={styles.wrapOR}>
                    <View style={styles.divider} />
                    <View style={styles.wrapTextOR}>
                        <Text>OR</Text>
                    </View>
                </View>
                <Button 
                    mode="outlined"
                    style={{flexDirection:"row"}}
                    onPress={onGoogleButtonPress}>
                    <AntDesign name="google" color={theme.colors.primary} size={18} style={{marginRight:4}} />
                    <Text color={theme.colors.primary} type="semibold">{"Sign in with google"}</Text>
                </Button>
            </View>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:32,
        backgroundColor:theme.colors.white,
        justifyContent:"center",
    },
    divider:{
        borderBottomWidth: 2,
        borderColor:theme.colors.defaultBorderColor,
        width:"100%",
        position:"absolute",
        zIndex:1, 
        top:11
    },
    title:{
        alignSelf:"center",
        marginBottom:16,
    },
    wrapTextOR:{
        zIndex:2,
        position:"absolute",
        backgroundColor:"white",
        paddingHorizontal:8
    },
    wrapOR:{
        alignItems:"center", 
        height:70, 
        justifyContent:"space-between"
    },
      row: {
        flexDirection: 'row',
        marginTop: 4,
      },
      label: {
        color: theme.colors.grey,
      },
      link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
      },
});

export default (Login)
