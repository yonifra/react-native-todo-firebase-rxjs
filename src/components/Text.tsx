import React,{ReactNode} from 'react';
import {Text, Dimensions,StyleSheet} from 'react-native';
import {RFValue as fs} from 'react-native-responsive-fontsize';
const {width} = Dimensions.get('window');

interface Props {
  type?: 'default' | 'thin' | 'regular' | 'semibold' | 'bold';
  color?: string;
  size?: number;
  children: string | ReactNode | null;
  style?:any;
}

const Typography: React.FC<Props> = ({type, size, style, color, children}) => {
  const TextStyles = styles[type || 'default'];
  const colors = {
      color: color || '#333333',
    },
    {width} = Dimensions.get('window');
  const sizeText = {
    fontSize: size ? fs(size, width) : fs(8, width),
  };
  return (
    <Text
      style={[TextStyles, colors, sizeText, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: fs(7, width),
    // fontFamily: 'Poppins-Regular',
  },
  thin: {
    fontSize: fs(9, width),
    // fontFamily: 'Poppins-Thin',
  },
  regular: {
    fontSize: fs(9, width),
    // fontFamily: 'Poppins-Regular',
  },
  semibold: {
    fontSize: fs(9, width),
    // fontFamily: 'Poppins-SemiBold',
  },
  bold: {
    fontSize: fs(9, width),
    // fontFamily: 'Poppins-Bold',
  },
});


export default Typography;
