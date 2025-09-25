import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, uploadAvatar } from "../features/user/userSlice";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    subjects: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        bio: user.bio || "",
        subjects: user.subjects?.join(", ") || "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

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
    setAvatarPreview(URL.createObjectURL(file));
    const fd = new FormData();
    fd.append("avatar", file);
    await dispatch(uploadAvatar(fd));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-slate-800 shadow-2xl text-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-400 mb-6">
        Your Profile
      </h2>

      {/* Avatar */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-700 text-gray-400">
              No Avatar
            </div>
          )}
        </div>
        <label className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-all">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            onChange={onAvatar}
            className="hidden"
          />
        </label>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Full Name"
          value={form.name}
          placeholder="John Doe"
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <Input
          label="Bio"
          value={form.bio}
          placeholder="Write something about yourself"
          onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
        />
        <Input
          label="Subjects (comma separated)"
          value={form.subjects}
          placeholder="Math, Science, History"
          onChange={(e) => setForm((s) => ({ ...s, subjects: e.target.value }))}
        />

        <div className="flex justify-end mt-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-all">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
