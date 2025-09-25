import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../features/groups/groupsSlice";
import GroupCard from "../Components/Groups/GroupCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const groups = useSelector((s) => s.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 pt-24 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-0">
          Recommended Study Groups
        </h1>
        <Link
          to="/groups"
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-semibold shadow-lg hover:scale-105"
        >
          Browse all
        </Link>
      </div>

      {/* Groups Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(groups.list || []).map((g) => (
          <GroupCard key={g._id} group={g} />
        ))}

        {/* If no groups */}
        {(groups.list || []).length === 0 && (
          <p className="text-gray-400 col-span-full text-center mt-12">
            No study groups available yet. Check back later or create a new one!
          </p>
        )}
      </div>
    </div>
  );
}
