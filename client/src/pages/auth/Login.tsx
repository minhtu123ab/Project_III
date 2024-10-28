import { Button, Input } from "antd";

const Login = () => {
  return <div className="w-screen h-screen flex justify-center items-center py-10 px-36">
    <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden flex bg-white">
      <div className="flex-[3] h-full bg-cyan-400 rounded-e-full flex items-center justify-center flex-col text-white gap-4">
        <h1 className="font-bold text-5xl font-mono">Welcome Back!</h1>
        <p className="text-center font-mono text-lg px-10"><strong>WorkTime Hub:</strong> Simplifying employee time tracking. Log in to clock in and manage work performance with ease.</p>
      </div>
      <div className="flex-[2] h-full bg-white flex items-center justify-center flex-col gap-3">
        <img className="w-16 h-auto" src="/logo.svg" alt="logo" />
        <h1 className="font-mono font-bold text-4xl">Login</h1>
        <div className="w-2/3 flex flex-col">
          <form className="flex flex-col gap-5">
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-mono" htmlFor="email">Email<span className="text-red-500">*</span></label>
                  <Input size="large" id="email" type="email" />
                </div>
                <div>
                  <label className="font-mono" htmlFor="password">Password<span className="text-red-500">*</span></label>
                  <Input size="large" id="password" type="password" />
                </div>
              </div>
              <p className="text-xs text-end font-mono text-cyan-700 cursor-pointer">Forgot Password</p>
            </div>
            <Button className=" bg-cyan-400 font-mono hover:!bg-cyan-500 font-bold text-xl py-5" type="primary" htmlType="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  </div>;
};

export default Login;
