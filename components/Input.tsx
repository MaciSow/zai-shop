import { ComponentProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

export const Input = ({ label, register, errorMessage, ...rest }: Props) => {
  return (
    <div>
      <label htmlFor={register?.name} className="block text-sm font-medium leading-6 text-gray-900">
        {label ?? register?.name}
      </label>
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...rest}
          {...register}
        />
        <span className="text-xs text-red-600 font-medium inline-block">{errorMessage}</span>
      </div>
    </div>
  );
};
