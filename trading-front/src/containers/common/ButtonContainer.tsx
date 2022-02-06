import React from 'react';
import { CommonButton } from '../../components/common/Button';

export interface ButtonProps {
  title: string;
  color?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const CommonButtonContainer: React.FC<ButtonProps> = ({
  title,
  color = 'black',
  onClick,
}) => {
  return <CommonButton title={title} color={color} onClick={onClick} />;
};
