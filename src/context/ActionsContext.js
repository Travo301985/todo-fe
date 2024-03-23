import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/base";
import { useAuth0 } from "@auth0/auth0-react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

export const ActionsContext = createContext({});

export const ActionsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      userId: 1,
      title: "Deploy a website",
      description: "Deploy a website on a server, AWS, or Netlify.",
      complete: false,
      dueDate: "2024-03-30",
      createdDate: "2024-03-20",
    },
    {
      id: 2,
      userId: 1,
      title: "Test a website",
      description: "Test a website on different devices",
      complete: true,
      dueDate: "2024-04-05",
      createdDate: "2024-03-22",
    },
    {
      id: 3,
      userId: 2,
      title: "Design a website",
      description: "Design a website using Figma or Adobe XD",
      complete: null,
      dueDate: "2024-03-25",
      createdDate: "2024-03-18",
    },
    {
      id: 4,
      userId: 3,
      title: "Mobile App Development",
      description: "Develop a mobile app using React Native or Flutter",
      complete: false,
      dueDate: "2024-04-10",
      createdDate: "2024-03-24",
    },
    {
      id: 5,
      userId: 2,
      title: "Web App Development",
      description: "App Development using React or Angular",
      complete: false,
      dueDate: "2024-03-28",
      createdDate: "2024-03-19",
    },
  ]);
  const [task, setTask] = useState({
    id: 5,
    userId: 2,
    title: "Web App Development",
    description: "App Development using React or Angular",
    complete: false,
    dueDate: "2024-03-28",
    createdDate: "2024-03-19",
  });

  const { user } = useAuth0();

  const queryClient = useQueryClient();

  // API calls using react query
  const mutation_fetchUserTodos = useMutation(
    (email) => axios.get(`${BASE_URL}/tasks/${email}`),
    {
      onMutate: () => setLoading(true),
      onSettled: () => setLoading(false),
      onSuccess: (data) => {
        setTasks(data?.data);
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const fetchUserTodos = (email) => {
    if (!email) {
      return navigate("/login");
    }
    mutation_fetchUserTodos.mutate(email);
  };

  const mutation_createTodo = useMutation(
    (todo) => axios.post(`${BASE_URL}/tasks`, todo),
    {
      onMutate: () => setLoading(true),
      onSettled: () => setLoading(false),
      onSuccess: (response) => {
        console.log(response);
        toast.success("Todo created successfully");
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const createTodo = (title, description, dueDate) => {
    if (!title || !description || !dueDate) {
      return toast.error("Please fill in all the fields");
    }
    mutation_createTodo.mutate({
      title,
      email: user?.email || "trevor",
      dueDate,
      description,
    });
  };

  const mutation_updateTodo = useMutation(
    (todo, id) => axios.put(`${BASE_URL}/tasks/${id}`, todo),
    {
      onMutate: () => setLoading(true),
      onSettled: () => setLoading(false),
      onSuccess: (response) => {
        setEdit(false);
        console.log(response);
        setTask(response?.data);
        queryClient.invalidateQueries("tasks");
        toast.success("Todo updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const updateTodo = (title, description, dueDate, complete, id) => {
    if (!title || !description || !dueDate) {
      return toast.error("Please fill in all the fields");
    }
    mutation_updateTodo.mutate(
      {
        title,
        dueDate,
        description,
        complete,
      },
      id
    );
  };

  const mutation_loginUser = useMutation(
    (user) => axios.post(`${BASE_URL}/login`, user),
    {
      onMutate: () => setLoading(true),
      onSettled: () => setLoading(false),
      onSuccess: (response) => {
        console.log(response);
        toast.success("Login successfully");
        window.sessionStorage.setItem("user", JSON.stringify(response.data));
        queryClient.invalidateQueries("login");
        return navigate("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const loginUser = (email, password) => {
    if (!email || !password) {
      return toast.error("Please fill in all the fields");
    }
    mutation_loginUser.mutate({
      email: email,
      password: password,
    });
  };

  const mutation_registerUser = useMutation(
    (user) => axios.post(`${BASE_URL}/register`, user),
    {
      onMutate: () => setLoading(true),
      onSettled: () => setLoading(false),
      onSuccess: (response) => {
        console.log(response);
        toast.success("Registration successfully");
        queryClient.invalidateQueries("register");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const registerUser = (name, email, password) => {
    if (!name || !email || !password) {
      return toast.error("Please fill in all the fields");
    }
    mutation_registerUser.mutate({
      username: name,
      email: email,
      password: password,
    });
  };

  // Other Functions
  function getStatusClass(complete, dueDate) {
    const status = getStatus(complete, dueDate);
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "IN_PROGRESS":
        return "text-yellow-500";
      case "TODO":
        return "text-red-500";
      default:
        return "";
    }
  }

  function getStatus(complete, dueDate) {
    if (complete === true) {
      return "COMPLETED";
    } else if (complete === false) {
      if (new Date(dueDate) > new Date()) {
        return "IN_PROGRESS";
      } else {
        return "TODO";
      }
    } else {
      return "TODO";
    }
  }

  // EVENTS
  useEffect(() => {
    return () => null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // VALUES
  const value = {
    edit,
    task,
    tasks,
    loading,
    setEdit,
    navigate,
    loginUser,
    getStatus,
    updateTodo,
    createTodo,
    setLoading,
    registerUser,
    fetchUserTodos,
    getStatusClass,
  };

  return (
    <div>
      <ActionsContext.Provider value={value}>
        {children}
      </ActionsContext.Provider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
