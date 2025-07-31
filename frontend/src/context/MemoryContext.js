// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const MemoryContext = createContext();

// export const MemoryProvider = ({ children }) => {
//   const API_BASE_URL =
//     process.env.REACT_APP_API_URL || "http://localhost:5000/api";
//   const [memories, setMemories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const getAuthHeaders = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   const clearMessages = () => {
//     setTimeout(() => {
//       setError(null);
//       setSuccessMessage(null);
//     }, 5000);
//   };

//   const fetchMemories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/memories`);
//       setMemories(res.data);
//       setSuccessMessage("Memories loaded successfully");
//     } catch (err) {
//       console.error("Error fetching memories:", err);
//       setError(
//         err.response?.data?.message || err.message || "Failed to load memories"
//       );
//     } finally {
//       setLoading(false);
//       clearMessages();
//     }
//   };

//   const addMemory = async (memoryData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/memories`,
//         memoryData,
//         getAuthHeaders()
//       );
//       setMemories((prev) => [res.data, ...prev]);
//       setSuccessMessage("Memory added successfully");
//       return res.data;
//     } catch (err) {
//       console.error("Error adding memory:", err);
//       setError(
//         err.response?.data?.message || err.message || "Failed to add memory"
//       );
//       throw err;
//     } finally {
//       setLoading(false);
//       clearMessages();
//     }
//   };

//   const updateMemory = async (id, updatedData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.put(
//         `${API_BASE_URL}/memories/${id}`,
//         updatedData,
//         getAuthHeaders()
//       );
//       setMemories((prev) =>
//         prev.map((mem) => (mem._id === id ? res.data : mem))
//       );
//       setSuccessMessage("Memory updated successfully");
//       return res.data;
//     } catch (err) {
//       console.error("Error updating memory:", err);
//       setError(
//         err.response?.data?.message || err.message || "Failed to update memory"
//       );
//       throw err;
//     } finally {
//       setLoading(false);
//       clearMessages();
//     }
//   };

//   const deleteMemory = async (id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`${API_BASE_URL}/memories/${id}`, getAuthHeaders());
//       setMemories((prev) => prev.filter((mem) => mem._id !== id));
//       setSuccessMessage("Memory deleted successfully");
//     } catch (err) {
//       console.error("Error deleting memory:", err);
//       setError(
//         err.response?.data?.message || err.message || "Failed to delete memory"
//       );
//       throw err;
//     } finally {
//       setLoading(false);
//       clearMessages();
//     }
//   };

//   useEffect(() => {
//     fetchMemories();
//   }, []);

//   return (
//     <MemoryContext.Provider
//       value={{
//         memories,
//         loading,
//         error,
//         successMessage,
//         fetchMemories,
//         addMemory,
//         updateMemory,
//         deleteMemory,
//       }}
//     >
//       {children}
//     </MemoryContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MemoryContext = createContext();

export const MemoryProvider = ({ children }) => {
  // const API_BASE_URL =
  //   process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  // const API_BASE_URL =
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:5000/api"
  //     : "https://birthday-weui.onrender.com/api";
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/memories`);
      setMemories(res.data);
    } catch (err) {
      console.error("Error fetching memories:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load memories"
      );
    } finally {
      setLoading(false);
    }
  };

  const addMemory = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/memories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMemories((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Error adding memory:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to add memory"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMemory = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_BASE_URL}/memories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMemories((prev) =>
        prev.map((mem) => (mem._id === id ? res.data : mem))
      );
      return res.data;
    } catch (err) {
      console.error("Error updating memory:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to update memory"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMemory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/memories/${id}`);
      setMemories((prev) => prev.filter((mem) => mem._id !== id));
    } catch (err) {
      console.error("Error deleting memory:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to delete memory"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <MemoryContext.Provider
      value={{
        memories,
        loading,
        error,
        fetchMemories,
        addMemory,
        updateMemory,
        deleteMemory,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};
