import { NextPage } from "next";
import Link from "next/link";
import { RiUser5Fill, RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login: NextPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const session = useSession();
  console.log(session);
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-900">
      <div className="space-y-4 rounded-lg bg-white p-10">
        <form className="space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="mail">
              <RiUser5Fill color="#8c8c8b" size={30} />
            </label>
            <input
              className="rounded-md border-2 border-slate-200 p-2 outline-none duration-100 focus:border-2 focus:border-red-700"
              type="mail"
              placeholder="Mail giriniz"
              id="mail"
              onChange={(e) => {
                setLoginInfo((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              value={loginInfo.email}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="password">
              <RiLockPasswordFill color="#8c8c8b" size={30} />
            </label>
            <input
              className="rounded-md border-2 border-slate-200 p-2 outline-none duration-100 focus:border-2 focus:border-red-700"
              type="password"
              placeholder="Şifre giriniz"
              id="password"
              onChange={(e) => {
                setLoginInfo((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const res = await signIn("credentials", {
                email: loginInfo.email,
                password: loginInfo.password,
                callbackUrl: "/dashboard",
              });
              console.log(res);
            }}
            className="w-full rounded-md bg-orange-500 py-2 text-white"
          >
            Giriş Yap
          </button>
        </form>
        <div className="mx-auto h-[2px] w-2/3 rounded-full bg-slate-500/10 "></div>
        <div>
          <Link href="/auth/register">
            <a>
              <div className="flex w-full items-center justify-center rounded-md bg-orange-500 py-2 text-white">
                Üye Ol
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
