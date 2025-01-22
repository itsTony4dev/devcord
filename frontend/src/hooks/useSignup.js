import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fName,
    lName,
    username,
    email,
    password,
    confirmPassword,
  }) => {
    const success = handleInputErrors({
      fName,
      lName,
      username,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName,
          lName,
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      throw toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputErrors({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
