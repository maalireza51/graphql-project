import styles from './Select.module.css';
import { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: ReactNode;
}

export const Select = ({ children, ...rest }: SelectProps) => {
  return (
    <div className={styles['select']}>
      <label htmlFor={rest.id}>
        {rest.icon && rest.icon}
        {rest.label}
      </label>
      <select {...rest}>{children}</select>
    </div>
  );
};

export default Select;
