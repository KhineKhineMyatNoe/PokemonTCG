import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import DropdownIcon from 'react-native-vector-icons/Ionicons';
import DropDownModal from './DropDownModal';
import {PhoneWidth} from '../config';
import Modal from 'react-native-modal';

interface Props {
  label: string;
  children: JSX.Element;
}

const DropDownComponent: React.FC<Props> = ({label, children}: Props) => {
  const renderModal = () => {
    return (
      <Modal
        isVisible={show}
        hasBackdrop={BackDrop}
        backdropOpacity={0.7}
        onBackdropPress={() => hide}>
        {children}
      </Modal>
    );
  };

  return (
    <TouchableOpacity onPress={() => {}} style={styles.bgDropdownFilter}>
      {renderModal()}
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#BCBBBB',
          fontSize: 11,
        }}>
        {label}
      </Text>
      <View style={{width: 2}} />
      <DropdownIcon name="chevron-down" size={16} color={'#BCBBBB'} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bgDropdownFilter: {
    backgroundColor: '#fff',
    height: 35,
    width: (PhoneWidth - 80) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    color: '#BCBBBB',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default DropDownComponent;
