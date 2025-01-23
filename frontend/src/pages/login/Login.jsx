import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    emailOrUsername: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="min-h-screen w-full rounded-xl bg-base-200 flex items-center justify-center p-4 ">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary">
            Devcord
          </h1>
          <p className="text-center text-base-content/70 mb-4">
            Connect with developers worldwide
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                placeholder="Email | Username"
                className="input input-bordered w-full"
                value={inputs.emailOrUsername}
                onChange={(e) =>
                  setInputs({ ...inputs, emailOrUsername: e.target.value })
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              // disabled={loading}
            >
              {!loading ? (
                "Sign In"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="text-center text-sm">
            Don&apos;t have an account?
            <Link to="/signup" className="link link-primary ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
