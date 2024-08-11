import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./Splash/Splash";
import Welcome from "./Splash/Welcome";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Home from "./Home/Home";
import Interests from "./Signup/Interests";
import Chat from "./Chat/Chat";
import Error from "./Error/Error";
import Profile from "./Profile/Profile";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/home/chat" element={<Chat />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="*" element={<Error />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
};
