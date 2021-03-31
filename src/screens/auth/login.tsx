import React,{useState,useEffect} from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View, Keyboard, TouchableOpacity, Image} from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import { showErrorToast } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { emailValidator, passwordValidator } from '@utils/validators';
import { setAuth } from '@store/actions/auth';
import TextInput from '@components/TextInput';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AntDesign from "react-native-vector-icons/AntDesign"
import constants from '@constants';
import PaperInput from 'components/PaperInput';
import Logo from 'components/Logo';
import PaperButton from 'components/PaperButton';


function Login({navigation}: any) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState({value:'', error: ''});
    const [password, setPassword] = useState({value:'', error: ''});
    const [isLoading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    async function onGoogleButtonPress() {
        await GoogleSignin.configure({
            ...constants.GoogleSigninConfigure,
            offlineAccess: false
        });
        try {
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
        } catch (error) {
            showErrorToast(error.message);
        }
        
    }

    const signInWithEmailAndPassword = (): void =>{
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
         }
        setLoading(true)
        auth()
        .signInWithEmailAndPassword(email.value, password.value)
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
                <Logo 
                    style={{alignSelf:"center"}}
                    source={require("../../../assets/images/arvis_logo_black.png")} 
                />
                {!isKeyboardVisible && (<View>
                    <PaperButton 
                        mode="outlined"
                        onPress={onGoogleButtonPress}>
                            <Image 
                                style={{width:20,height:20,resizeMode:"contain", marginRight:6}}
                                source={require("../../../assets/images/google.png")}  />
                            <Text color={theme.colors.grey} size={7}>{"Masuk menggunakan Google"}</Text>
                    </PaperButton>
                    <View style={styles.wrapOR}>
                        <View style={styles.divider} />
                        <View style={styles.wrapTextOR}>
                            <Text color="rgba(12, 12, 12, 0.5)">atau masuk menggunakan email</Text>
                        </View>
                    </View>
                </View>)}
            <KeyboardAvoidingView
               behavior={Platform.OS==="ios" ? "padding" : "height"} >
                    <PaperInput 
                        value={email.value}
                        errorText={email.error}
                        placeholder="ex: myemail@anydomain.com"
                        onChangeText={(value) => setEmail({value, error: ''}) }
                    />
                    <PaperInput 
                        value={password.value}
                        errorText={password.error}
                        placeholder="************"
                        onChangeText={(value) => setPassword({value, error: ''}) }
                        isPassword
                    />

                    <View style={[styles.row, {alignSelf:"flex-end"}]}>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text color="red" >Lupa kata sandi</Text>
                        </TouchableOpacity>
                    </View>

                    <PaperButton 
                        loading={isLoading} 
                        onPress={signInWithEmailAndPassword}>
                        <Text color="white" type="semibold">{isLoading?"Loading...":"Log in"}</Text>
                    </PaperButton>

                   
                    <View style={[styles.row, {alignSelf:"center"}]}>
                        <Text style={styles.label}>Belum memiliki akun? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.link}>Daftar</Text>
                        </TouchableOpacity>
                    </View>

            </KeyboardAvoidingView>
            
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
        top:10
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
        marginTop:20,
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
