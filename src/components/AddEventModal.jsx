import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddEventModal({ setShowAddModal, refreshEvents }) {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
    });

    // Fetch old event info if editing
    useEffect(() => {
        if (id) {
            api
                .get(`/events/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setFormData(res.data);
                });
        }
    }, [id]);

    // Input Change Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit Handler
    const submit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await api.put(`/events/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Event updated successfully!");
            } else {
                await api.post("/events", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Event created successfully!");
            }
            // refresh event list
            refreshEvents();
            // CLOSE MODAL
            setShowAddModal(false);
            //update to events page
            navigate("/events");

        } catch (err) {
            console.error(err);

            if (err.response?.status === 422) {
                toast.error("Validation failed!");
            } else if (err.response?.status === 401) {
                toast.error("Unauthorized! Please login again.");
            } else {
                toast.error("Failed to save event!");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-[2px] flex items-center justify-center z-50">
            <form
                onSubmit={submit}
                className="bg-gray-500 text-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 relative"
            >
                {/* Modal Title */}
                <h2 className="text-2xl font-bold text-white text-center">
                    {id ? "Edit Event" : "Add Event"}
                </h2>

                {/* Title */}
                <div className="flex flex-col">
                    <label className="mb-1 text-white">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border bg-white border-gray-300 rounded px-3 py-2 text-black"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="mb-1 text-white">Description</label>
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border bg-white border-gray-300 rounded px-3 py-2 text-black"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Date */}
                <div className="flex flex-col">
                    <label className="mb-1 text-white">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border bg-white border-gray-300 rounded px-3 py-2 text-black"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        {id ? "Update" : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}
