import React from 'react';
import styles from './checkbox.module.scss';
import { CheckSvg } from '../../svgs/svgs';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className={styles.checkboxInput}
      />
      <span className={styles.customCheckbox}><CheckSvg /></span>
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};

export default Checkbox;
