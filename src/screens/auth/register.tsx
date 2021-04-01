import React,{useState,useEffect} from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View, Keyboard, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'
import Text from '@components/Text'
import PaperButton from '@components/PaperButton'
import Logo from '@components/Logo'
import { showErrorToast } from '@components/Toast';
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { setAuth } from '@store/actions/auth';
import PaperInput from '@components/PaperInput';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AntDesign from "react-native-vector-icons/AntDesign"
import constants from "@constants";
import { emailValidator, passwordValidator, nameValidator } from '@utils/validators';

function Register({navigation}: any) {
    const dispatch = useDispatch()
    const [name, setName] = useState({value:'', error: ''});
    const [email, setEmail] = useState({value:'', error: ''});
    const [password, setPassword] = useState({value:'', error: ''});
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

    const createUserWithEmailAndPassword = (): void =>{
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (nameError || emailError || passwordError) {
            setName({ ...email, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
         }
        setLoading(true)
        auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(async (response) => {
            await auth()?.currentUser?.updateProfile({displayName: name.value})
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

      const SocialLogin = () => (
        <>
            <PaperButton 
                mode="outlined"
                onPress={onGoogleButtonPress}>
                <Image 
                    style={styles.iconButton}
                    source={require("../../../assets/images/google.png")}  />
                <Text color={"#5b5b5b"} type="thin">{"Buat akun menggunakan Google"}</Text>
            </PaperButton>
            <View style={styles.wrapOR}>
                <View style={styles.divider} />
                <View style={styles.wrapTextOR}>
                    <Text color="rgba(12, 12, 12, 0.5)">atau menggunakan email</Text>
                </View>
            </View>
        </>
    )

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
               behavior={Platform.OS==="ios" ? "padding" : "height"}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Logo 
                        style={{alignSelf:"center"}}
                        source={require("../../../assets/images/arvis_logo_black.png")} 
                    />

                    {!isKeyboardVisible && (<SocialLogin />)}

                    <PaperInput
                        label="Nama Lengkap"
                        value={name.value}
                        errorText={name.error}
                        placeholder="contoh: Anton Budo Cahyadi"
                        onChangeText={(value) => setEmail({value, error: ''}) }
                    />

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

                    <PaperButton 
                        loading={isLoading} 
                        onPress={createUserWithEmailAndPassword}>
                        <Text type="thin" color="black">{isLoading ? "Loading..." : "Buat akun baru"}</Text>
                    </PaperButton>

                    <PaperButton 
                        mode="text"
                        loading={isLoading} 
                        onPress={():void => navigation.navigate("Login")}>
                        <Text style={styles.label}>Sudah memiliki akun? <Text style={styles.link}>Masuk</Text></Text>
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
        // fontWeight: 'bold',
        color: 'rgb(43, 107, 160)',
    },
    iconButton: {
        width:16,
        height:16,
        marginVertical:-1,
        resizeMode:"contain", 
        marginRight:10
    }
});

export default (Register)
