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
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Recommended Study Groups</h1>
        <Link to="/groups" className="text-indigo-600">
          Browse all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(groups.list || []).map((g) => (
          <GroupCard key={g._id} group={g} />
        ))}
      </div>
    </div>
  );
}
