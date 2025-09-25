import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (auth.token && auth.user) nav("/dashboard");
  }, [auth, nav]);

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-12">
        <h1 className="text-5xl font-extrabold mb-6">Cerebro</h1>
        <p className="text-lg text-slate-300 max-w-md text-center">
          Match with the right study partners, boost your learning, and never
          study alone again.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
              placeholder="••••••••"
            />
            {auth.error && <p className="text-red-400 text-sm">{auth.error}</p>}
            <Button
              type="submit"
              disabled={auth.status === "loading"}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
            >
              {auth.status === "loading" ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-slate-400 text-sm mt-6 text-center">
            New here?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
