import React,{ReactNode} from "react";
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { TouchableOpacity, StyleSheet } from "react-native";
import { theme } from '@utils/theme';

interface Props {
    mode?: 'outlined' | 'default' | 'link';
    onPress?: ((event: any) => void) | undefined;
    children?: ReactNode | null;
    style?: any;
    loading?:boolean;
}

const CustomButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity 
        activeOpacity={.5}
        onPress={props.onPress}
        disabled={props.loading} 
        style={[
            styles.button,
              { backgroundColor: props.loading ? theme.colors.disabled : theme.colors.primary },
                props.mode === 'link' && {
                  borderWidth:0, 
                  backgroundColor: theme.colors.white, 
                },
                props.mode === 'outlined' && {
                  borderWidth:1, 
                  backgroundColor: theme.colors.white, 
                  borderColor:theme.colors.primary 
                },
            props.style,
          ]}
    >
        {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button:{
        marginVertical:8,
        paddingVertical:12,
        paddingHorizontal:wp(8),
        borderRadius:wp(2),
        alignItems:"center",
        justifyContent:"center",
        borderColor:theme.colors.defaultBorderColor,
    }
})

export default CustomButton