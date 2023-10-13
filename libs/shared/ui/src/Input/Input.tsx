import React, { ReactNode } from 'react';
import styles from './Input.module.css';

/* eslint-disable-next-line */
export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  id: string;
  icon?: ReactNode;
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className={styles['input']}>
      <label htmlFor={rest.id}>
        {rest.icon && rest.icon}
        {label}
      </label>
      <input {...rest} />
    </div>
  );
}

export default Input;
