import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { IoCashOutline } from "react-icons/io5";

const ControllerInput: React.FC<IControllerInput> = ({
  control,
  errors,
  name,
  labelName,
  required,
  type,
  money,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700" htmlFor={name}>
        {labelName}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            prefix={money && <IoCashOutline />}
            type={type}
            {...field}
            size="large"
            placeholder={labelName}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ControllerInput;
