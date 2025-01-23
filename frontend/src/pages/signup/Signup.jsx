import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fName: "",
    lName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="min-h-screen w-full rounded-xl bg-base-200 flex items-center justify-center p-4">
      <div className="card  w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary">
            Devcord
          </h1>
          <p className="text-center text-base-content/70 mb-4">
            Join the developer community
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form_control flex justify-between">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-1/2 mr-1"
                value={inputs.fName}
                onChange={(e) =>
                  setInputs({ ...inputs, fName: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-1/2 mr-1"
                value={inputs.lName}
                onChange={(e) =>
                  setInputs({ ...inputs, lName: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary w-full"
            disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="text-center text-sm">
            Already have an account?
            <Link
              to="/login"
              className="link link-primary ml-1"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign in"
              )}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
