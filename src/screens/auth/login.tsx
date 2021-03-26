import React from 'react';
import {Platform ,StyleSheet, KeyboardAvoidingView, View} from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import { useDispatch } from 'react-redux';
import { theme } from '@utils/theme';
import { setAuth } from '@store/actions/auth';
import TextInput from '@components/TextInput';

function Login({navigation}: any) {
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState({text:'', error: ''});
    const [password, setPassword] = React.useState({text:'', error: ''});

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS==="ios" ? "padding" : "height"}
                style={styles.container}>
                <Text style={{alignSelf:"center"}} type="semibold">My Todo Login</Text>
                <TextInput 
                    value={email.text}
                    placeholder="Type your email"
                    onChangeText={(text) => setEmail({...email, text}) }
                />
                <TextInput 
                    value={password.text}
                    placeholder="Type your password"
                    onChangeText={(text) => setPassword({...password, text}) }
                    isPassword
                />
                <Button onPress={()=> dispatch(setAuth({profile:{name:"Feri"}}))}>
                    <Text color="white" type="semibold">Login</Text>
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
