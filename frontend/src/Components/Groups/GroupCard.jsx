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
    <div className="p-4 bg-white rounded shadow">
      <h4 className="font-semibold">{group.name}</h4>
      <p className="text-sm text-gray-500">{group.subjects?.join(", ")}</p>
      <div className="mt-3 flex justify-between items-center">
        <Link to={`/groups/${group._id}`} className="text-indigo-600 text-sm">
          View
        </Link>
        <button
          onClick={onJoin}
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
        >
          Join
        </button>
      </div>
    </div>
  );
}
