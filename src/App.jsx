import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages wrapped with Layout */}
        <Route element={<Layout />}>
          <Route path="/events" element={<EventList />} />
          <Route path="/add" element={<EventForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
