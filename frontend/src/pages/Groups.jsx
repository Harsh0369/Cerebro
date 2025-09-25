import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroups,
  createGroup,
  joinGroup,
} from "../features/groups/groupsSlice";
import GroupCard from "../Components/Groups/GroupCard";
import GroupForm from "../Components/Groups/GroupForm";

export default function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((s) => s.groups.list);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onCreate = async (data) => {
    await dispatch(createGroup(data));
    setOpenCreate(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Study Groups</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Group
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {groups.map((g) => (
          <GroupCard key={g._id} group={g} />
        ))}
      </div>

      <GroupForm
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={onCreate}
      />
    </div>
  );
}
