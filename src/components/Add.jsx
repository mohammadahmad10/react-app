import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setError(null);
      setSuccess(false);
      const response = await axios.post(
        "https://rf-json-server.herokuapp.com/events",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data Submitted:", response.data);
      setSuccess(true);
      reset(); // Resets the form fields
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit the data. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 flex flex-col justify-center items-center gap-10">
      <h2 className="text-5xl max-md:text-3xl font-semibold text-center">
        Create
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-5 w-1/2 max-md:w-full"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters long" } })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            id="description"
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            {...register("description", { required: "Description is required", minLength: { value: 3, message: "Description must be at least 3 characters long" } })}
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            id="company"
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            {...register("company", { required: "Company is required", minLength: { value: 3, message: "Company must be at least 3 characters long" } })}
          />
          {errors.company && <span className="text-red-500">{errors.company.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            placeholder="Enter Color"
            id="color"
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            {...register("color", { required: "Color is required", minLength: { value: 3, message: "Color must be at least 3 characters long" } })}
          />
          {errors.color && <span className="text-red-500">{errors.color.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {error && <div className="text-center text-red-500 text-xl">{error}</div>}

        {success && (
          <div className="text-center text-green-500">
            Data submitted successfully!
          </div>
        )}

        <button
          type="submit"
          className={`max-w-3xl font-semibold text-white text-2xl ${
            isSubmitting ? "bg-gray-300" : "bg-[#008AF2] "
          } text-center py-2 rounded-lg mt-5`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
