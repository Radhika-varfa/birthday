import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all gallery items
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/gallery`);
      setGalleryItems(response.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch gallery items"
      );
    } finally {
      setLoading(false);
    }
  };

  // Create new gallery item
  const createGalleryItem = async (formData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `${API_BASE_URL}/gallery`,
        formData,
        config
      );
      setGalleryItems((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw (
        err.response?.data?.message ||
        err.message ||
        "Failed to create gallery item"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update gallery item
  const updateGalleryItem = async (id, formData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.put(
        `${API_BASE_URL}/gallery/${id}`,
        formData,
        config
      );
      setGalleryItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      throw (
        err.response?.data?.message ||
        err.message ||
        "Failed to update gallery item"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete gallery item
  const deleteGalleryItem = async (id) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios.delete(`${API_BASE_URL}/gallery/${id}`, config);
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      throw (
        err.response?.data?.message ||
        err.message ||
        "Failed to delete gallery item"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        galleryItems,
        loading,
        error,
        fetchGalleryItems,
        createGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
