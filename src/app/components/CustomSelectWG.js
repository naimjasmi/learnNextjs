import React, { useState } from 'react';
import styles from './CustomSelect.css'; // Import your CSS file for styling
import { FaAngleDown, FaHandPointer } from "react-icons/fa"; // Import the icon you want to use

const CustomSelectWG = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleSelect = (option) => {
        const newValue = value.includes(option.value)
            ? value.filter((val) => val !== option.value)
            : [...value, option.value];
        onChange(newValue);
    };

    return (
        <div className={styles.customSelect}>
            <div className={styles.selectInput} onClick={toggleOpen}>
                <input
                    type="text"
                    value={value.map((val) => options.find((option) => option.value === val)?.label).join(', ')}
                    placeholder="Select Work Group"
                    className={styles.selectedOption}
                    style={{ cursor: 'pointer'}}
                    readOnly
                />
            </div>
            {open && (
                <div className={styles.optionList}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                            style={{ cursor: 'pointer', backgroundColor: value.includes(option.value) ? '#ffa500' : 'inherit' }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};
export default CustomSelectWG;
