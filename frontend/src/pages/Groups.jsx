import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, createGroup } from "../features/groups/groupsSlice";
import GroupCard from "../Components/Groups/GroupCard";
import GroupForm from "../Components/Groups/GroupForm";

export default function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((s) => s.groups.list || []);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onCreate = async (data) => {
    await dispatch(createGroup(data));
    setOpenCreate(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 pt-24 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
          Study Groups
        </h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:scale-105 transition-transform duration-300 font-semibold text-white"
        >
          Create Group
        </button>
      </div>

      {/* Groups Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map((g) => <GroupCard key={g._id} group={g} />)
        ) : (
          <p className="text-gray-400 col-span-full text-center mt-12">
            No study groups available yet. Create one to get started!
          </p>
        )}
      </div>

      {/* Group Form Modal */}
      <GroupForm
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={onCreate}
      />
    </div>
  );
}
