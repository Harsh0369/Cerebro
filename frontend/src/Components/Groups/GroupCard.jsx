import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../features/groups/groupsSlice";

export default function GroupCard({ group }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onJoin = async () => {
    const res = await dispatch(joinGroup(group._id));
    if (res.type.endsWith("fulfilled")) {
      nav(`/groups/${group._id}`);
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300 hover:scale-105 transform">
      {/* Group Title */}
      <h4 className="text-lg md:text-xl font-bold text-white mb-2">
        {group.name}
      </h4>

      {/* Subjects */}
      <p className="text-gray-300 text-sm md:text-base mb-4">
        {group.subjects?.join(", ")}
      </p>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link
          to={`/groups/${group._id}`}
          className="text-indigo-400 hover:text-indigo-500 font-medium transition-colors duration-300 text-sm md:text-base"
        >
          View
        </Link>
        <button
          onClick={onJoin}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold shadow hover:shadow-indigo-500/50 transition-all duration-300 text-sm md:text-base"
        >
          Join
        </button>
      </div>
    </div>
  );
}
