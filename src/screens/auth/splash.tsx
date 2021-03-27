import React from 'react';
import {View ,StyleSheet} from 'react-native'
import Text from '@components/Text'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '@utils/theme';
import { useDispatch } from 'react-redux';
import { setSplash } from '@store/actions/apps';

 function SpashScreen() {
    const dispatch = useDispatch()

    React.useEffect(() => {
          setTimeout(() => {
            dispatch(setSplash())
          }, 2000);
      }, []);
    return (
        <View style={styles.container}>
            <Text type="bold" size={18}>MY TODO</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:theme.colors.white
    },
    logo:{
        width:wp(50),
        height:wp(50)
    }
});

export default (SpashScreen)
