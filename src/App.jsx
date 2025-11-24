import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";

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
          {/* <Route path="/add" element={<EventForm />} /> */}
          <Route path="/edit/:id" element={<EventForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
         {/* <ToastContainer autoClose={2000} position="top-right" /> */}
      </Routes>
      <ToastContainer autoClose={2000} position="top-right" />
    </BrowserRouter>
  );
}

export default App;
