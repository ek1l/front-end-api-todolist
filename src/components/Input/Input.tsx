import { forwardRef } from 'react';
import styles from './Input.module.scss';

type TInputProps = {
  type: string;
  name: string;
  label: string;
};

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ type, name, label, ...props }, ref) => {
    return (
      <label className={styles.label}>
        <span>{label}:</span>
        <input type={type} name={name} ref={ref} {...props} />
      </label>
    );
  },
);

export default Input;
