import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface ActionButtonProps extends ButtonProps {
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, ...props }) => {
  return (
    <Button {...props}>
      {label}
    </Button>
  );
};

export default ActionButton;
