'use client';

import { InputProps } from '@/types';
import { cn } from '@/utils/cn';

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows,
  className,
  ...props
}: InputProps) {
  const isTextarea = type === 'textarea';
  
  const inputClasses = cn(
    'form-input',
    className
  );

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows || 4}
          className={inputClasses}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
      )}
    </div>
  );
}
