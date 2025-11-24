import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EventForm({ event }) {
  const { id } = useParams();

  // const [data, setData] = useState({
  //   title: event ? event.title : "",
  //   description: event ? event.description : "",
  //   date: event ? event.date : "",
  // });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      api.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
        setFormData(res.data); // old data set in form
      });
    }
  }, [id]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update event
        await api.put(`/events/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Event updated successfully!");
      } else {
        // Create new event
        await api.post("/events", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Event created successfully!");
      }

      navigate("/events");
    } catch (err) {
      console.error(err);

      if (err.response?.status === 422) {
        // Laravel validation error
        toast.error("Validation failed! Please check your inputs.");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized! Please login again.");
      } else {
        toast.error("Failed to save event!");
      }
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
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Description</label>
          <textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}
