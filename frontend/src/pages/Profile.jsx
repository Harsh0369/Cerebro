import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, uploadAvatar } from "../features/user/userSlice";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    subjects: user?.subjects?.join(", ") || "",
  });

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      bio: form.bio,
      subjects: form.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    await dispatch(updateProfile(payload));
  };

  const onAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    await dispatch(uploadAvatar(fd));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <form onSubmit={submit}>
        <Input
          label="Full name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <Input
          label="Bio"
          value={form.bio}
          onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
        />
        <Input
          label="Subjects (comma separated)"
          value={form.subjects}
          onChange={(e) => setForm((s) => ({ ...s, subjects: e.target.value }))}
        />
        <div className="mb-4">
          <label className="block mb-1">Avatar</label>
          <input type="file" accept="image/*" onChange={onAvatar} />
        </div>
        <Button type="submit">Save profile</Button>
      </form>
    </div>
  );
}
