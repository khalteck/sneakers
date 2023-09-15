/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Login = () => {
  const {
    login,
    loginForm,
    handleLoginChange,
    setValidationErr,
    validationErr,
    inlineloader,
    errorMessage,
  } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginForm?.email && loginForm?.password) {
      await login();
    } else {
      setValidationErr("All fields are required");
    }
  };

  return (
    <>
      {/* {loader && <Loader />} */}

      <main className="w-full h-screen text-black font-kumbh bg-register bg-cover bg-no-repeat bg-bottom overflow-hidden">
        <section className="w-full h-full bg-[#d1d5db] overflow-y-auto">
          {/*================================================Link to navigate back to the Home page */}
          <Link to="/">
            <p className="underline hover:text-[#fe7d1b] text-[.85rem] ml-4 mt-4 cursor-pointer">
              Back to Home
            </p>
          </Link>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/*================================================Logo */}
            <div className="flex gap-2 items-center mb-5">
              <h1 className="text-[1.25rem] md:text-[2rem] font-bold">
                Shoply
              </h1>
            </div>
            <div className="w-full md:max-w-xl lg:max-w-[500px] bg-[#fefffe] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/*================================================Form Title */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                  Login
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full flex gap-3 md:gap-4 md:flex-row flex-col">
                    <div className="w-full">
                      {/*================================================Date of Birth Input */}
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[.75em] sm:text-sm rounded-lg w-full p-2.5"
                        placeholder="name@email.com"
                        required
                        value={loginForm?.email || ""}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>

                  {/*================================================Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-[.75em] sm:text-sm rounded-lg w-full p-2.5"
                      required
                      value={loginForm?.password || ""}
                      onChange={handleLoginChange}
                    />
                  </div>

                  {/*================================================Validation Error */}
                  {validationErr && (
                    <div className="w-full p-2 my-2 text-[.9rem] text-red-500 border border-red-500 rounded-md">
                      {validationErr}
                    </div>
                  )}

                  {/*================================================User Exists Error */}
                  {errorMessage && (
                    <div className="w-full p-2 my-2 text-[.9rem] text-red-500 border border-red-500 rounded-md">
                      {errorMessage}
                    </div>
                  )}

                  {/*================================================Submit Button */}
                  <button
                    type="submit"
                    disabled={inlineloader}
                    className="w-full text-white bg-orange-500/80 hover:bg-[#fe7d1b] flex justify-center items-center gap-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {inlineloader ? "" : "Login"}
                    {inlineloader && <ClipLoader color={"#fff"} size={20} />}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Not registered yet?{" "}
                    {/*================================================Link to navigate to Login page */}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </>
  );
};

export default Login;
