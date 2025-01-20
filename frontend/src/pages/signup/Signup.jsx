import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <div className="min-h-screen w-full rounded-xl bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary">
            Devcord
          </h1>
          <p className="text-center text-base-content/70 mb-4">
            Join the developer community
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="divider">or</div>

          <p className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
