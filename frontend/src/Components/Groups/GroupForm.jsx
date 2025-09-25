import React, { useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function GroupForm({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    description: "",
    isPublic: true,
    standard: "High School",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.subject.trim()) return;
    if (!form.isPublic && !form.password.trim()) return;

    const payload = {
      name: form.name.trim(),
      subjects: [form.subject.trim()],
      description: form.description.trim(),
      isPublic: form.isPublic,
      standard: form.standard,
      password: form.isPublic ? null : form.password.trim(),
    };

    onCreate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Study Group">
      <form onSubmit={submit} className="space-y-4">
        {/* Group Name */}
        <Input
          label="Group Name"
          value={form.name}
          placeholder="Enter group name"
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />

        {/* Subject */}
        <Input
          label="Subject"
          value={form.subject}
          placeholder="Enter the subject"
          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
        />

        {/* Standard */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1 font-medium">Standard</label>
          <select
            value={form.standard}
            onChange={(e) =>
              setForm((s) => ({ ...s, standard: e.target.value }))
            }
            className="px-3 py-2 rounded-xl bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option>High School</option>
            <option>Secondary School</option>
            <option>College</option>
          </select>
        </div>

        {/* Description */}
        <Input
          label="Description"
          value={form.description}
          placeholder="Brief description about the group"
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
        />

        {/* Public / Private */}
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="groupType"
              checked={form.isPublic}
              onChange={() =>
                setForm((s) => ({ ...s, isPublic: true, password: "" }))
              }
              className="accent-indigo-500"
            />
            <span className="text-gray-300">Public</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="groupType"
              checked={!form.isPublic}
              onChange={() => setForm((s) => ({ ...s, isPublic: false }))}
              className="accent-yellow-400"
            />
            <span className="text-gray-300">Private</span>
          </label>
        </div>

        {/* Password field for Private groups */}
        {!form.isPublic && (
          <Input
            label="Password"
            type="password"
            value={form.password}
            placeholder="Enter a password for the group"
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
          />
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-all">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
