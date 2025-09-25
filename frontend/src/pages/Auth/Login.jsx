import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login to Cerebro</h2>
      <form onSubmit={submit}>
        <Input
          label="Email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />
        {auth.error && <p className="text-red-500 mb-2">{auth.error}</p>}
        <Button type="submit" disabled={auth.status === "loading"}>
          {auth.status === "loading" ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
