import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupById, setActiveGroup } from "../features/groups/groupsSlice";
// import socket from '../socket' // You will plug socket client here later

export default function GroupRoom() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((s) => s.groups.activeGroup);

  useEffect(() => {
    dispatch(fetchGroupById(id));
    // TODO: connect socket and join group room
    // socket.emit('joinRoom', { groupId: id, userId: auth.user._id });
    return () => {
      // TODO: disconnect socket / leave room
    };
  }, [dispatch, id]);

  if (!group) return <div className="p-8">Loading group...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{group.name}</h2>
        <div className="h-96 border rounded p-2 overflow-auto">
          {/* Chat area: socket messages rendered here */}
          <p className="text-gray-500">
            Chat area (socket-powered) — implement using socket.io client.
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 px-3 py-2 border rounded"
            placeholder="Type a message..."
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Send
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Members</h3>
        <ul>
          {group.members?.map((m) => (
            <li key={m._id} className="py-1">
              {m.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
