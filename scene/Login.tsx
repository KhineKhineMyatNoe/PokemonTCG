import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../NavigationTypes';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const Login: React.FC<Props> = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
