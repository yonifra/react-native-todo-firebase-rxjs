import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import { editTodo } from "@store/actions/todos";
import TextInput from "@components/TextInput"
import {useDispatch} from "react-redux"
import { theme } from "@utils/theme";
import Text from "@components/Text"
import { useNavigation, useRoute } from "@react-navigation/native";

function EditTodo() {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {item}: any = route.params

    const [title, setTitle] = React.useState<string>(item?.title);

    const updateTodo = (): void => {
        Object.assign(item, {title})
        dispatch(editTodo(item))
        navigation.goBack()
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (<TouchableOpacity 
                                onPress={updateTodo} 
                                style={{marginRight:16}}>
                                <Text>Save</Text>
                             </TouchableOpacity>),
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <TextInput 
                value={title}
                onChangeText={text => setTitle(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:theme.colors.background
    }
})

export default EditTodo 