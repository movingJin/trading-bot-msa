import Button from '@material-ui/core/Button';
import React from 'react';
import { ButtonProps } from '@containers/common/ButtonContainer';

export const CommonButton: React.FC<ButtonProps> = ({
  title,
  color,
  onClick,
}) => {
  return (
    <div>
      <Button style={{ color }} onClick={onClick}>
        {title}
      </Button>
    </div>
  );
};
