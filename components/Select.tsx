import { ComponentProps, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends ComponentProps<'select'> {
  label?: string;
  errorMessage?: string;
  options: string[];
  register: UseFormRegisterReturn;
}

export const Select = ({ label, errorMessage, register, options, ...rest }: Props) => (
  <div>
    <label htmlFor={register.name} className="block text-sm font-medium leading-6 text-gray-900">
      {label ?? register.name}
    </label>
    <div className="mt-2">
      <select
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        {...rest}
        {...register}
      >
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-xs text-red-600 font-medium inline-block">{errorMessage}</span>
    </div>
  </div>
);
