import React from 'react';
import {View ,StyleSheet} from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import { useDispatch } from 'react-redux';
import { theme } from 'utils/theme';
import { setAuth } from 'store/actions/auth';

 function Login({navigation}: any) {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <Text>My Todo Login</Text>
            <Button onPress={()=> dispatch(setAuth({profile:{name:"Feri"}}))}>
                <Text>Login</Text>
            </Button>
            <Button onPress={()=> navigation.navigate("Register")}>
                <Text>Register</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:theme.colors.white
    },
});

export default (Login)
