import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
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
