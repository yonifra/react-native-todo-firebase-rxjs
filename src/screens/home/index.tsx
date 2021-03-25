import React from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import {connect} from "react-redux"
import { getTodos, deleteTodo } from '../../store/actions/todos';
import { theme } from "../../utils/theme";


function Home({navigation, todos, getTodos, deleteTodo}: any) {

    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const searcTimeout = setTimeout(()=>{
            getTodos(search)
        }, 400);
        return ()=> clearTimeout(searcTimeout)
    }, [search]);

   
    const renderItem = ({item}: any) => (
        <View key={item.id} style={styles.listItem}>
            <Text>{item.title}</Text>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity 
                    style={{marginRight:6}} 
                    onPress={()=>navigation.navigate("EditTodo",{item})}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteTodo(item)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <TextInput 
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder="Search todo..."
            />
            <FlatList 
                data={todos.data}
                renderItem={renderItem}
                keyExtractor={item=> item.id}
            />
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={()=>navigation.navigate("AddTodo")}>
                <Text color="white" size={19} >+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:theme.colors.background
    },
    addButton:{
        backgroundColor:theme.colors.primary,
        justifyContent:"center",
        alignItems:"center",
        width:60,
        height:60,
        borderRadius:30,
        position:"absolute",
        bottom:26,
        right:26,
    },
    listItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:theme.colors.defaultBorderColor
    }
})


const mapStateToProps = (state: any) => ({
    todos: state.todos
})

const mapDispatchToProps = (dispatch: any) => ({
    getTodos: (data: any)=> dispatch(getTodos(data)),
    deleteTodo: (data: any)=> dispatch(deleteTodo(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)