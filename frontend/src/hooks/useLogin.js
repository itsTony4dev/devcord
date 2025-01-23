import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ emailOrUsername, password }) => {
    setLoading(true);
    try {
      const success = handleInputs({ emailOrUsername, password });
      if (!success) return;
      const res = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          throw new Error(data.message || "Invalid email/username or password");
        } else if (res.status === 401) {
          throw new Error("Invalid email/username or password");
        } else {
          throw new Error(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
      const data = await res.json();
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

function handleInputs({ emailOrUsername, password }) {
  if (emailOrUsername.trim() === "" || password.trim() === "") {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}

export default useLogin;
