import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import AddEventModal from "./AddEventModal";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const confirmDelete = (onConfirm) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                onConfirm();
                closeToast();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleDelete = (id) => {
    confirmDelete(() => {
      // API request to delete
      console.log("Deleted:", id);
      toast.success("Deleted successfully!");
    });
  };

  useEffect(() => {
    if (!token) return navigate("/");
    api.get("/events", { headers }).then((res) => setEvents(res.data));
  }, []);

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await api.delete(`/events/${id}`, { headers });
    setEvents(events.filter((e) => e.id !== id));
  };

  //Handle Modal
  const [showAddModal, setShowAddModal] = useState(false);
  //
  const fetchEvents = () => {
    api.get("/events", { headers }).then((res) => setEvents(res.data));
  };
  //Fetch events on load
  useEffect(() => {
    if (!token) return navigate("/");
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">My Events</h2>
          <Link
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
          >
            <FaPlus size={20} />
          </Link>
        </div>

        {showAddModal && (
          <AddEventModal
            setShowAddModal={setShowAddModal}
            refreshEvents={fetchEvents}
          />
        )}

        {events.length === 0 ? (
          <p className="text-red-600">No data found</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="border px-4 py-2">{e.title}</td>
                  <td className="border px-4 py-2">{e.date}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Link
                        to={`/edit/${e.id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        title="Edit"
                      >
                        <FaRegEdit size={25} />
                      </Link>

                      {/* <button
                        onClick={() => del(e.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Delete"
                      >
                        <RiDeleteBin6Fill size={25} />
                      </button> */}

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600"
                      >
                        <RiDeleteBin6Fill size={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
