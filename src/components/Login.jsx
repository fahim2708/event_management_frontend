// // src/components/Login.js
// import { useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     const res = await api.post("/login", data);
//     localStorage.setItem("token", res.data);
//     navigate("/events");
//   };

//   return (
//     <form onSubmit={submit}>
//       <h2>Login</h2>
//       <input placeholder="Email" onChange={e=>setData({...data, email:e.target.value})} />
//       <input placeholder="Password" type="password" onChange={e=>setData({...data, password:e.target.value})} />
//       <button>Login</button>
//     </form>
//   );
// }


// src/components/Login.js
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data);
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
