/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { useAppContext } from "../contexts/AppContext";
import { ClipLoader } from "react-spinners";

const Register = () => {
  //================================================Handle form submission
  const {
    handleRegChange,
    regForm,
    inlineloader,
    register,
    setValidationErr,
    validationErr,
    userExists,
  } = useAppContext();

  //================================================Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      regForm?.first_name &&
      regForm?.last_name &&
      regForm?.email &&
      regForm?.password
    ) {
      await register(regForm);
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
            <p className="underline hover:text-orange-400 text-[.85rem] ml-4 mt-4 cursor-pointer">
              Back to Home Page
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
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign Up
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full flex gap-3 md:gap-4 md:flex-row flex-col">
                    <div className="w-full">
                      {/*================================================First Name Input */}
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[.75em] sm:text-sm rounded-lg w-full p-2.5"
                        placeholder="John"
                        required
                        value={regForm.first_name || ""}
                        onChange={handleRegChange}
                      />
                    </div>
                    <div className="w-full">
                      {/*================================================Last Name Input */}
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[.75em] sm:text-sm rounded-lg w-full p-2.5"
                        placeholder="Doe"
                        required
                        value={regForm.last_name || ""}
                        onChange={handleRegChange}
                      />
                    </div>
                  </div>

                  <div className="w-full flex gap-3 md:gap-4 md:flex-row flex-col">
                    <div className="w-full">
                      {/*================================================Date of Birth Input */}
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
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
                        value={regForm.email || ""}
                        onChange={handleRegChange}
                      />
                    </div>
                  </div>
                  {/*================================================Email Input */}
                  <div></div>
                  {/*================================================Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      value={regForm.password || ""}
                      onChange={handleRegChange}
                    />
                  </div>

                  {/*================================================Validation Error */}
                  {validationErr && (
                    <div className="w-full p-2 my-2 text-[.9rem] text-red-500 border border-red-500 rounded-md">
                      {validationErr}
                    </div>
                  )}

                  {/*================================================User Exists Error */}
                  {userExists && (
                    <div className="w-full p-2 my-2 text-[.9rem] text-red-500 border border-red-500 rounded-md">
                      {userExists}
                    </div>
                  )}

                  {/*================================================Submit Button */}
                  <button
                    type="submit"
                    disabled={inlineloader}
                    className="w-full text-white bg-orange-500/80 hover:bg-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex gap-3 justify-center items-center"
                  >
                    {inlineloader ? "" : "Register"}
                    {inlineloader && <ClipLoader color={"#fff"} size={20} />}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    {/*================================================Link to navigate to Login page */}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign In
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

export default Register;
