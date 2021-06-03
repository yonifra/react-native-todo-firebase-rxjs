import React,{useState,useEffect} from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View, Keyboard, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'
import Text from '@components/Text'
import { showErrorToast } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { emailValidator, passwordValidator } from '@utils/validators';
import { setAuth } from '@store/actions/auth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import constants from '@constants/index';
import PaperInput from 'components/PaperInput';
import Logo from 'components/Logo';
import PaperButton from 'components/PaperButton';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { REGISTER_SCREEN } from 'constants/routes';
import Axios from 'utils/Axios';
import { useNavigation } from '@react-navigation/native';


function Login() {
    const navigation = useNavigation()
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

    const getCurrentUser = async () => {
        console.log("FETCHING");
        try {
            const user = await Axios.get(`api/web/v0/user/getCurrentUser`);
            console.log(user);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("FETCHING DONE");
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, []);

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
            console.log(response);
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
               behavior={Platform.OS==="ios" ? "padding" : "height"}>
                <ScrollView
                    keyboardShouldPersistTaps="handled" 
                    showsVerticalScrollIndicator={false}>

                   <Logo style={{alignSelf:"center"}} source={require("../../../assets/images/arvis_logo_black.png")} />

                    {!isKeyboardVisible && (
                        <>
                            <PaperButton 
                                mode="outlined"
                                icon={()=>(<Image  style={styles.iconButton} source={require("../../../assets/images/google.png")}  />)}
                                onPress={onGoogleButtonPress}>
                                    <Text color={"#5b5b5b"} type="thin">{"Masuk menggunakan Google"}</Text>
                            </PaperButton>
                            <View style={styles.wrapOR}>
                                <View style={styles.divider} />
                                <View style={styles.wrapTextOR}>
                                    <Text color="rgba(12, 12, 12, 0.5)">atau menggunakan email</Text>
                                </View>
                            </View>
                        </>
                    )}

                    <PaperInput
                        label="Email" 
                        value={email.value}
                        errorText={email.error}
                        placeholder="ex: myemail@anydomain.com"
                        onChangeText={(value) => setEmail({value, error: ''}) }
                    />
                    <PaperInput
                        label="Password" 
                        value={password.value}
                        errorText={password.error}
                        placeholder="************"
                        onChangeText={(value) => setPassword({value, error: ''}) }
                        isPassword
                    />

                    <View style={[styles.row, {alignSelf:"flex-end", marginBottom:8}]}>
                        <TouchableOpacity onPress={() => Alert.alert("ForgotPassword")}>
                            <Text color="rgb(244, 67, 54)" >Lupa kata sandi</Text>
                        </TouchableOpacity>
                    </View>

                    <PaperButton 
                        loading={isLoading} 
                        onPress={signInWithEmailAndPassword}>
                        <Text type="thin" color="black">{isLoading ? "Loading..." : "Log in"}</Text>
                    </PaperButton>

                    <PaperButton 
                        mode="text"
                        loading={isLoading} 
                        onPress={():void => navigation.navigate(REGISTER_SCREEN)}>
                        <Text style={styles.label}>Belum memiliki akun? <Text style={styles.link}>Daftar</Text></Text>
                    </PaperButton>
                </ScrollView>
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
        borderBottomWidth: 1,
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
        height:40, 
        marginTop:20,
        justifyContent:"space-between"
    },
    row: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    label: {
        color: 'rgba(12, 12, 12, 0.5)',
    },
    link: {
        color: 'rgb(43, 107, 160)',
    },
    iconButton: {
        resizeMode:"contain",
        width:16,
        height:16,
    }
});

export default (Login)
