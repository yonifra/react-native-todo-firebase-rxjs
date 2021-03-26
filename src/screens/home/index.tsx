import React from "react";
import {
    TextInput as ReactTextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Platform,
    View,
    Image,
} from "react-native"
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import Button from '@components/Button'
import { 
    deleteTodo, 
    editTodo,
    getTodos,
    addTodo,
} from '../../store/actions/todos';
import { theme } from "../../utils/theme";
import AntDesign from "react-native-vector-icons/AntDesign"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import {v4 as uuidv4} from 'react-native-uuid'
import {useSelector, useDispatch} from "react-redux"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export default function Home() {
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const todos = useSelector((state: any) => state.todos)

    const inputRef = React.useRef<ReactTextInput>(null)

    const [todo, setTodo] = React.useState<{ id?:string; title:string; createAt?:Date; }>({title:""});
    
    const handleAddOrUpdateTodo = (): void => {
        if(todo.title=="")return;
        if(todo.id==null){
            dispatch(addTodo({...todo, id: uuidv4(), createAt: Date.now()}))
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
                    <AntDesign name="closecircle" color="#88939E" size={16} />
                </TouchableOpacity>
        </TouchableOpacity>
    )

    
    return (
        <SafeAreaView 
            //@ts-ignore
            forceInsets={{top:'never'}}
            style={styles.container}>
              <KeyboardAvoidingView 
                behavior={Platform.OS==="ios" ? "padding" : "height"}
                keyboardVerticalOffset={62+insets.bottom}
                style={{flex:1}}
                >
                <View style={{flex:95}}>
                    <FlatList
                        data={todos.data}
                        renderItem={renderItem}
                        keyExtractor={item=> item.id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={EmptyComponent}
                    />
                </View>
                <View style={styles.compose}>
                    <TextInput 
                        ref={inputRef}
                        type="round"
                        value={todo.title}
                        style={{flex:.9, marginRight:-8, height:40}}
                        onChangeText={title => setTodo(prev => ({...prev, title}))}
                        placeholder="I want to..."
                    />
                    <Button 
                        style={styles.buttonCircle}
                        onPress={handleAddOrUpdateTodo}>
                        {todo?.id==null 
                            ? (<Feather name="plus" size={20} color="white" />)
                            : (<EvilIcons name="pencil" size={20} color="white" />)}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const EmptyComponent = () => (
    <View style={{alignItems:"center"}}>
        <Image 
            source={require("../../../assets/images/undraw_empty.png")} 
            style={{
                    resizeMode:"contain",
                    width:wp(70),
                    height:wp(70)
                }}
             />
        <Text type="bold" size={10}>There are no tasks today</Text>
    </View>
)

const styles = StyleSheet.create({
    container:{
        backgroundColor:theme.colors.white,
        justifyContent:"space-between",
        flexDirection:"column",
        flex:1,
    },
    buttonCircle:{
        backgroundColor:theme.colors.primary,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:8,
        borderRadius:20,
        fontSize:13,
        height:40,
        width:40,
        flex:.11,
    },
    listItem:{
        borderBottomColor:theme.colors.defaultBorderColor,
        borderBottomWidth:0.2,
        paddingHorizontal:16,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        minHeight:50,
    },
    compose:{
        borderTopColor:theme.colors.defaultBorderColor,
        justifyContent:"space-between",
        backgroundColor:"white",
        borderTopWidth:0.5,
        paddingHorizontal:12,
        flexDirection:"row", 
        alignSelf:"center",
    }
})

