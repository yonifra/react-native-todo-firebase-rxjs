import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import Text from "../../components/Text"
import TextInput from "../../components/TextInput"
import {connect} from "react-redux"
import { editTodo } from "../../store/actions/todos";
import { theme } from "../../utils/theme";

function EditTodo({navigation, route, editTodo }: any) {
    const {item} = route.params

    const [title, setTitle] = React.useState<string>(item.title);
    
    const updateTodo = (): void => {
        Object.assign(item, {title})
        editTodo(item)
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


const mapDispatchToProps = (dispatch: any) => ({
    editTodo: (data: any)=> dispatch(editTodo(data)),
})

export default connect(null,mapDispatchToProps)(EditTodo)