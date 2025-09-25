import React, { useState } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(signup(form));
    if (res.type.endsWith("fulfilled")) nav("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-12">
        <h1 className="text-5xl font-extrabold mb-6">Cerebro</h1>
        <p className="text-lg text-slate-300 max-w-md text-center">
          Create your profile, choose your subjects, and get matched with
          like-minded learners. Start studying smarter today.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6">
            Create your account 🚀
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="John Doe"
            />
            <Input
              label="Username"
              value={form.username}
              onChange={(e) =>
                setForm((s) => ({ ...s, username: e.target.value }))
              }
              placeholder="johndoe123"
            />
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
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
              disabled={auth.status === "loading"}
            >
              {auth.status === "loading" ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          <p className="text-slate-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
