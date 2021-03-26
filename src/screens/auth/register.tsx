import React from 'react';
import {View ,StyleSheet} from 'react-native'
import Text from '@components/Text'
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '@utils/theme';

function Splash({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text>Register</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    logo:{
        width:wp(50),
        height:wp(50)
    }
});

export default connect()(Splash)
