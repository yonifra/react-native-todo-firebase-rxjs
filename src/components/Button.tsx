import React,{ReactNode} from "react";
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "utils/theme";

interface Props {
    mode?: 'outlined' | 'default';
    onPress?: ((event: any) => void) | undefined;
    children?: ReactNode | null;
    style?:any;
    loading?:boolean;
}

const CustomButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity 
        onPress={props.onPress}
        disabled={props.loading} 
        style={[
            styles.button,
            { backgroundColor: props.loading ? theme.colors.disabled : theme.colors.primary },
            props.mode === 'outlined' && { backgroundColor: theme.colors.white, borderColor:theme.colors.primary },
            props.style,
          ]}
        {...props}
    >
        {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button:{
        marginVertical:16,
        paddingVertical:12,
        paddingHorizontal:wp(8),
        borderRadius:wp(2),
        alignItems:"center",
        borderColor:theme.colors.defaultBorderColor,
    }
})

export default CustomButton