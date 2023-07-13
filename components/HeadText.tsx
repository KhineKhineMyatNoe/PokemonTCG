import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const statusHeight = getStatusBarHeight();
interface Props {
  title: string;
}
const HeadText: React.FC<Props> = ({title}: Props) => {
  return (
    <View style={styles.titleContainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.HeaderTitleTxt}>{title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    //  height: 77,
    backgroundColor: 'white',
    paddingTop: statusHeight + 20,
    paddingBottom: 35,
  },
  HeaderTitleTxt: {
    color: '#1D1C1C',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    lineHeight: 36,
  },
});
export default HeadText;
