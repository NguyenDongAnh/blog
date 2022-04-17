import classNames from 'classnames'
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef((
    {
        label,
        placeholder,
        className,
        htmlType,
        autoComplete,
        size,
        ariaLabel,
        required,
    },
    ref
) => {
    return (
        <div className={classNames(styles.root, className)}>
            <label>
                {label && <div className={styles.label}>{label}</div>}
                <input
                    type={htmlType}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    ref={ref}
                    className={classNames(styles.input, size && styles[size])}
                    aria-label={ariaLabel}
                    required={required}
                />
            </label>
        </div>
    );
});

export default Input;
