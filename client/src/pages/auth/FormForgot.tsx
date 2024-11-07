import { Button, Input, message } from "antd";
import React, { useState } from "react";
import axios from "axios";

const FormForgot: React.FC<IFormLoginProps> = ({ handleClickForgot }) => {
  const [visibleForgot, setVisibleForgot] = useState(true);
  const [visibleCode, setVisibleCode] = useState(false);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickCancelCode = () => {
    setVisibleCode(!visibleCode);
    setVisibleForgot(!visibleForgot);
  };

  const handleClickNextEmail = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/forgot-password-code", {
        username,
      });
      message.success("Code has been sent to your email");
      handleClickCancelCode();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        message.error(e.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        (
          document.getElementById(`code-${index + 1}`) as HTMLInputElement
        ).focus();
      }
    }
  };

  const handleClickSubmitForgotPassword = async () => {
    const combinedCode = code.join("");
    try {
      await axios.post("http://localhost:8080/api/user/reset-password", {
        username,
        code: combinedCode,
        password: newPassword,
        passwordAgain: confirmPassword,
      });
      message.success("Password recovered successfully");
      handleClickForgot();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        message.error(e.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-[2] h-full bg-white flex items-center justify-center flex-col gap-3">
      <img className="w-16 h-auto" src="/logo.svg" alt="logo" />
      <h1 className="font-mono font-bold text-4xl">Forgot</h1>
      <div className="w-2/3 flex flex-col">
        {visibleForgot && (
          <form className="flex flex-col gap-5">
            <div>
              <label className="font-mono" htmlFor="email">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="large"
                id="email"
                type="email"
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="primary"
                onClick={handleClickForgot}
                className="font-bold font-mono text-xl py-5 bg-gray-300 text-gray-700 hover:!bg-gray-400 hover:!text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClickNextEmail}
                className="bg-cyan-400 font-mono hover:!bg-cyan-500 font-bold text-xl py-5"
                type="primary"
              >
                Next
              </Button>
            </div>
          </form>
        )}
        {visibleCode && (
          <form className="flex flex-col gap-5" autoComplete="off">
            <div>
              <label className="font-mono" htmlFor="code">
                Code<span className="text-red-500">*</span>
              </label>
              <Input.Group
                compact
                className="flex justify-center gap-2 items-center w-full"
              >
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    style={{
                      width: "13%",
                      borderRadius: "8px",
                      textAlign: "center",
                      fontSize: "1.25rem",
                      marginRight: "3.66666666666666667%",
                      aspectRatio: "1",
                    }}
                  />
                ))}
              </Input.Group>
            </div>
            <p className="text-gray-500 -mt-5 text-sm">
              Check your email and enter the code.
            </p>
            <div>
              <label className="font-mono" htmlFor="newPassword">
                New Password<span className="text-red-500">*</span>
              </label>
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                size="large"
                id="newPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="font-mono" htmlFor="confirmPassword">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="large"
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="primary"
                onClick={handleClickCancelCode}
                className="font-bold font-mono text-xl py-5 bg-gray-300 text-gray-700 hover:!bg-gray-400 hover:!text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClickSubmitForgotPassword}
                className="bg-cyan-400 font-mono hover:!bg-cyan-500 font-bold text-xl py-5"
                type="primary"
              >
                Next
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormForgot;
