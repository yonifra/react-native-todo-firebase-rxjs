import React from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View} from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { setAuth } from '@store/actions/auth';
import TextInput from '@components/TextInput';
import auth from '@react-native-firebase/auth';


function Login({navigation}: any) {
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState({text:'septianferi74@gmail.com', error: ''});
    const [password, setPassword] = React.useState({text:'123456', error: ''});
    const [isLoading, setLoading] = React.useState(false);

    const signInWithEmailAndPassword = (): void =>{
        setLoading(true)
        auth()
        .signInWithEmailAndPassword(email.text, password.text)
        .then((response) => {
            dispatch(setAuth(response))
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.log(error);
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS==="ios" ? "padding" : "height"}
                style={styles.container}>
                <Text style={{alignSelf:"center"}} type="semibold">My Todo Login</Text>
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
                    <Text color="white" type="semibold">{isLoading?"Loading...":"Login"}</Text>
                </Button>
                <Button mode="outlined" onPress={()=> navigation.navigate("Register")}>
                    <Text color={theme.colors.primary} type="semibold">Register</Text>
                </Button>
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16,
        backgroundColor:theme.colors.white,
        justifyContent:"center",
    },
});

export default (Login)
