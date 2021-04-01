import React,{ReactNode,memo} from 'react';
import {Text, Dimensions,StyleSheet,StyleProp, TextStyle} from 'react-native';
import {RFValue as fs} from 'react-native-responsive-fontsize';
import { useOrientation } from 'hooks/useOrientation';
interface Props {
  type?: 'default' | 'thin' | 'regular' | 'semibold' | 'bold';
  color?: string;
  size?: number;
  children: string | ReactNode | null;
  style?:StyleProp<TextStyle>;
  maxLines?:number;
}

const Typography: React.FC<Props> = props => {
  const TextStyles = styles[props.type || 'default'];
  const colors = {
      color: props.color || '#333333',
    };
  // const {width} = Dimensions.get("window")
  // const standardScreenHeight = useOrientation() === "LANDSCAPE" ? width : undefined
  const sizeText = {
    fontSize: props.size ? fs(props.size) : fs(14),
  };
  return (
    <Text
      numberOfLines={props.maxLines}
      style={[TextStyles, colors, sizeText, props.style]}
      >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: fs(13),
    fontFamily: 'OpenSans-Regular',
  },
  thin: {
    fontSize: fs(14),
    fontFamily: 'OpenSans-Light',
    fontWeight:'500'
  },
  regular: {
    fontSize: fs(14),
    fontFamily: 'OpenSans-Regular',
  },
  semibold: {
    fontSize: fs(14),
    fontFamily: 'OpenSans-SemiBold',
  },
  bold: {
    fontSize: fs(14),
    fontFamily: 'OpenSans-Bold',
  },
});


export default memo(Typography);
