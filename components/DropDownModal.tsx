import React, {Children} from 'react';
import Modal from 'react-native-modal';

interface Props {
  show: boolean;
  BackDrop: boolean;
  children: JSX.Element;
  hide: (() => void) | undefined;
}

const DropDownModal: React.FC<Props> = ({
  show,
  BackDrop,
  children,
  hide,
}: Props) => {
  return <></>;
};
export default DropDownModal;
