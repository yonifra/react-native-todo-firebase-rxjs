import React, { memo } from 'react';
import { Image, StyleSheet, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  source:ImageSourcePropType,
  style?:StyleProp<ImageStyle>
}

const Logo: React.FC<Props> = ({ source, style }) => (
  <Image source={source} style={[styles.image, style]} />
);

const styles = StyleSheet.create({
  image: {
    width: wp(50),
    height: hp(7),
    marginBottom: 12,
    resizeMode: "contain"
  },
});

export default memo(Logo);
