import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const ControllerSelect: React.FC<IControllerSelect> = ({
  control,
  errors,
  name,
  labelName,
  required,
  data,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className=" font-medium text-gray-700">
        {labelName}
        {required && <span className="text-red-500">*</span>}:
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            size="large"
            id={name}
            placeholder={`Select a ${labelName}`}
            className="rounded-md"
            options={data}
            {...field}
            disabled={disabled}
          />
        )}
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ControllerSelect;
