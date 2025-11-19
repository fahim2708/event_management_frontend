import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function EventForm({ event }) {
  const [data, setData] = useState({
    title: event ? event.title : "",
    description: event ? event.description : "",
    date: event ? event.date : "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (event) {
        // Update event
        await api.put(`/events/${event.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new event
        await api.post("/events", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert("Failed to save event");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          {event ? "Edit Event" : "Add Event"}
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Title</label>
          <input
            type="text"
            placeholder="Event Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Description</label>
          <textarea
            placeholder="Event Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          {event ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

