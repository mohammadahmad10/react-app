import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Add() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    company: "",
    color: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await axios.post(
        "https://rf-json-server.herokuapp.com/events",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data Submitted:", response.data);
      setSuccess(true);
      setError(null);
      navigate("/");
      setFormData({
        name: "",
        description: "",
        company: "",
        color: "",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit the data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 flex flex-col justify-center items-center gap-10">
      <h2 className="text-5xl max-md:text-3xl font-semibold text-center">
        Create
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-5 w-1/2 max-md:w-full"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            name="name"
            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            required
            minLength={3}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            id="description"
            name="description"
            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            required
            minLength={3}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            id="company"
            name="company"
            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            required
            minLength={3}
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            placeholder="Enter Color"
            id="color"
            name="color"
            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            required
            minLength={3}
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            required
            minLength={3}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className="text-center text-red-500 text-xl">{error}</div>
        )}

        {success && (
          <div className="text-center text-green-500">
            Data submitted successfully!
          </div>
        )}

        <button
          type="submit"
          className={`max-w-3xl font-semibold text-white text-2xl ${
            loading ? "bg-gray-300" : "bg-[#008AF2] "
          } text-center py-2 rounded-lg mt-5`}
          disabled={loading}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}
