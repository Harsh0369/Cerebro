import React, { useState } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={submit}>
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <Input
          label="Username"
          value={form.username}
          onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
        />
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
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}
