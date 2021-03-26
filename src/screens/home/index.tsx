import React from "react";
import {
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput as ReactTextInput,
    Platform,
    View,
} from "react-native"
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import {useSelector, useDispatch} from "react-redux"
import { 
    getTodos,
    addTodo,
    editTodo,
    deleteTodo 
} from '../../store/actions/todos';
import { theme } from "../../utils/theme";
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import firestore from '@react-native-firebase/firestore';


export default function Home() {
    const dispatch = useDispatch()
    const todos = useSelector((state: any) => state.todos)

    const inputRef = React.useRef<ReactTextInput>(null)

    const [todo, setTodo] = React.useState<{ id?:string; title:string; createAt?:Date; }>({title:""});
    
    const handleAddOrUpdateTodo = (): void => {
        if(todo.title=="")return;
        if(todo.id==null){
            dispatch(addTodo({...todo, createAt: Date.now()}))
        }else{
            dispatch(editTodo(todo))
        }   
        setTodo({title:""})
    }

    React.useEffect(() => {
        dispatch(getTodos(""))
    }, []);

    const renderItem = ({item}: any) => (
        <TouchableOpacity 
            key={item.id} 
            onLongPress={(): void =>{
                setTodo(item)
                inputRef?.current?.focus()
            }}
            style={styles.listItem}>
                <Text style={{flex:.95}}>{item.title}</Text>
                <TouchableOpacity 
                    style={{flex:.05}}
                    onPress={()=>dispatch(deleteTodo(item))}>
                    <AntDesign name="closecircle" color="grey" size={13} />
                </TouchableOpacity>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList 
                data={todos.data}
                renderItem={renderItem}
                keyExtractor={item=> item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:90}}
            />
            <KeyboardAvoidingView 
                behavior={Platform.OS==="ios" ? "padding" : "height"}
                keyboardVerticalOffset={90}
                style={styles.compose}>
                    <TextInput 
                        ref={inputRef}
                        value={todo.title}
                        style={{flex:.9, marginRight:-6}}
                        onChangeText={title => setTodo(prev => ({...prev, title}))}
                        placeholder="I want to..."
                    />
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleAddOrUpdateTodo}>
                        {todo?.id==null 
                            ? (<Feather name="plus" size={25} color="white" />)
                            : (<EvilIcons name="pencil" size={25} color="white" />)}
                    </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:theme.colors.background
    },
    button:{
        flex:.1,
        marginVertical:8,
        backgroundColor:theme.colors.primary,
        justifyContent:"center",
        alignItems:"center",
        padding:8,
        borderRadius:10,
        fontSize:13,
        height:50,
    },
    listItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:theme.colors.defaultBorderColor
    },
    compose:{
        flex:1,
        backgroundColor:"white",
        margin:-16,
        paddingHorizontal:16,
        marginBottom:16,
        position:"absolute",
        bottom:0,
        flexDirection:"row", 
        justifyContent:"space-between",
        alignSelf:"center"
    }
})

