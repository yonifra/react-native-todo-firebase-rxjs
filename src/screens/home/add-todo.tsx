import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import Text from "../../components/Text"
import TextInput from "../../components/TextInput"
import {connect} from "react-redux"
import { addTodo } from "../../store/actions/todos";
import { theme } from "../../utils/theme";

function AddTodo({ addTodo, navigation }: any) {

    const [title, setTitle] = React.useState<string>("");
    
    const handleAddTodo=()=> {
        addTodo({title, timestamp: new Date()})
        navigation.goBack()
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (<TouchableOpacity 
                                onPress={handleAddTodo} 
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
                placeholder="Type new todo"
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
    addTodo: (data: any)=> dispatch(addTodo(data)),
})

export default connect(null,mapDispatchToProps)(AddTodo)