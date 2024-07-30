/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;
  const navigate = useNavigate();

  const [displayCollection, setDisplayCollection] = useState(false);

  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  //===============================to fecth store data
  async function fetchData() {
    console.log("fetching");
    const options = {
      method: "GET",
      url: "https://dummyjson.com/products?limit=50",
    };

    try {
      const response = await axios.request(options);
      localStorage.setItem("products", JSON.stringify(response.data.products));
      setdata(response.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  //=====================================to handle cart
  const [cart, setcart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  function addToCart(item) {
    const newItems = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(newItems));
    setcart(newItems);
  }

  function removeItem(index) {
    const newItems = [...cart];
    const removed = newItems?.filter((_, idx) => idx !== index);
    localStorage.setItem("cart", JSON.stringify(removed));
    setcart(removed);
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    setcart([]);
  }

  //=======================================to handle auth
  const [inlineloader, setInlineLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [userExists, setuserExists] = useState("");

  const [validationErr, setValidationErr] = useState("");

  //================================================================to handle register
  const [regForm, setRegForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  //to handle form input change chnage
  function handleRegChange(event) {
    setErrorMessage("");
    setValidationErr("");
    const { id, value } = event.target;
    setRegForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }
  const register = async () => {
    setInlineLoader(true);

    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        regForm.email,
        regForm.password
      );

      const user = authResult.user;

      // Set the display name in the user's authentication profile
      await updateProfile(user, {
        displayName: regForm.first_name,
      });

      // Include the user's UID in the user data
      const userData = { ...regForm, uid: user.uid };

      // Create a document in the Firestore users collection
      await createUserDocument(user.uid, userData);

      setInlineLoader(false);
      navigate("/login");
    } catch (error) {
      setInlineLoader(false);
      console.log(error.message);
      setuserExists(true);
      alert("User exists");
    }
  };

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  //function to create user doc on sign up
  const createUserDocument = async (uid, data) => {
    try {
      const docRef = await setDoc(doc(db, "users", uid), {
        firstname: data?.first_name,
        lastname: data?.last_name,
        email: data?.email,
        createdAt: getCurrentDateTime(),
        user_id: uid,
      });
      console.log("Document written with ID: ", docRef?.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //========================================================================to handle login
  //to save login form input
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  //to handle form input change chnage
  function handleLoginChange(event) {
    setErrorMessage("");
    setValidationErr("");
    const { id, value } = event.target;
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  //to log in users
  const login = async () => {
    setInlineLoader(true);

    try {
      getUserByEmail(loginForm.email);
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      setInlineLoader(false);
      navigate("/");
    } catch (error) {
      setInlineLoader(false);
      console.log(error.message);
      if (
        error?.message?.includes("auth/user-not-found)") ||
        error?.message?.includes("auth/invalid-login-credentials")
      ) {
        setErrorMessage("Invalid login Credentials");
      } else {
        setErrorMessage("AN error occured");
      }
    }
  };

  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );
  async function getUserByEmail(email) {
    setInlineLoader(true);

    const queryRef = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    try {
      const querySnapshot = await getDocs(queryRef);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setUserDetails({ ...user, ...docData });
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...user, ...docData })
        );
      } else {
        console.log("No matching documents found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setInlineLoader(false);
    }
  }

  //to save current user from auth in state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    });
  }, [userDetails]);

  //to log out users
  const logout = async () => {
    signOut(auth).then(() => {
      navigate("/");
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
      localStorage.removeItem("cart");
      window.location.reload();
    });
  };

  //to show and hide password
  const [showPassword, setShowPassword] = useState(false);
  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  //========================================================to handle search
  const [openSearch, setOpenSearch] = useState(false);

  function toggleSearch() {
    setOpenSearch((prev) => !prev);
    setsearchTerm("");
  }

  const [searchTerm, setsearchTerm] = useState("");
  const [searchData, setsearchData] = useState([]);

  function handleSearch() {
    if (searchTerm) {
      setOpenSearch(false);
      navigate("/search");
      const matchingData = data?.filter((item) =>
        item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );

      setsearchData(matchingData);
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        fetchData,
        data,
        addToCart,
        removeItem,
        cart,
        setValidationErr,
        validationErr,
        inlineloader,
        errorMessage,
        userExists,
        handleRegChange,
        register,
        handleLoginChange,
        login,
        logout,
        showPassword,
        togglePassword,
        loginForm,
        regForm,
        userDetails,
        toggleSearch,
        openSearch,
        searchData,
        setsearchTerm,
        handleSearch,
        searchTerm,
        emptyCart,
        setDisplayCollection,
        displayCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
