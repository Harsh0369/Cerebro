import React, { useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function GroupForm({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    subjects: "",
    description: "",
    isPublic: true,
  });

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      subjects: form.subjects.split(",").map((s) => s.trim()),
      isPublic: form.isPublic,
    };
    onCreate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Study Group">
      <form onSubmit={submit}>
        <Input
          label="Group Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <Input
          label="Subjects (comma separated)"
          value={form.subjects}
          onChange={(e) => setForm((s) => ({ ...s, subjects: e.target.value }))}
        />
        <Input
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
        />
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(e) =>
              setForm((s) => ({ ...s, isPublic: e.target.checked }))
            }
          />
          <label>Public Group</label>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
}
