import { MdError } from "react-icons/md";
import React from "react";

const Input = ({
  label,
  type,
  value,
  onChange,
  icon,
  onClick,
  name,
  error,
  touched,
  fieldProps,
  placeholder,
  accept,
  disabled,
  defaultValue,
}: {
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: any;
  onClick?: any;
  error?: string;
  touched?: any;
  fieldProps?: any;
  placeholder?: string;
  accept?: string;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: (event: React.MouseEvent) => void;
}) => {
  const inputBorderColor = touched && error ? "input-error" : "";
  return (
    <div className="flex w-[100%] flex-col gap-2 relative">
      <p className="font-[600] text-sm">{label}</p>
      <label
        className={`text-[#141414] input input-md input-bordered rounded-[4px] flex items-center gap-2 ${inputBorderColor}`}
      >
        <input
          disabled={disabled}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
          defaultValue={defaultValue}
          accept={accept}
          dateFormat="dd-MM-yyyy"
          className="grow text-sm border rounded-md w-full md:w-[420px] h-[40px] focus:border-[#15265E] focus:outline-[#15265E]"
          {...fieldProps}
          placeholder={placeholder}
        />
        {icon && (
          <div
            onClick={onClick}
            className="absolute right-3 top-[45px] transform -translate-y-1/2 cursor-pointer"
          >
            {icon}
          </div>
        )}
      </label>
      {touched && error ? (
        <div className="text-error flex gap-1 justify-left items-center">
          <MdError fontSize={"1rem"} />
          <p className="text-sm text-error">{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
