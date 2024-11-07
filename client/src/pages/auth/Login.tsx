import { useState } from "react";
import FormLogin from "./FormLogin";
import FormForgot from "./FormForgot";

const Login = () => {
  const [visibleLogin, setVisibleLogin] = useState(true);
  const handleClickForgot = () => {
    setVisibleLogin(!visibleLogin);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center py-10 px-36">
      <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden flex bg-white">
        <div className="flex-[3] h-full bg-cyan-400 rounded-e-full flex items-center justify-center flex-col text-white gap-4">
          <h1 className="font-bold text-5xl font-mono">Welcome Back!</h1>
          <p className="text-center font-mono text-lg px-10">
            <strong>WorkTime Hub:</strong> Simplifying employee time tracking.
            Log in to clock in and manage work performance with ease.
          </p>
        </div>
        {visibleLogin ? (
          <FormLogin handleClickForgot={handleClickForgot} />
        ) : (
          <FormForgot handleClickForgot={handleClickForgot} />
        )}
      </div>
    </div>
  );
};

export default Login;
