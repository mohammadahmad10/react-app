import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      company: "",
      color: "",
      email: "",
    },
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rf-json-server.herokuapp.com/events/${id}`
        );
        const { name, description, company, color, email } = response.data;

        // Populate form values with fetched data
        setValue("name", name);
        setValue("description", description);
        setValue("company", company);
        setValue("color", color);
        setValue("email", email);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      setError(null);
      const response = await axios.put(
        `https://rf-json-server.herokuapp.com/events/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data Updated:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Failed to update the data. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 flex flex-col justify-center items-center gap-10">
      <h2 className="text-5xl max-md:text-3xl font-semibold text-center">Edit</h2>
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
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 3,
                message: "Description must be at least 3 characters long",
              },
            })}
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            id="company"
            {...register("company", {
              required: "Company is required",
              minLength: {
                value: 3,
                message: "Company must be at least 3 characters long",
              },
            })}
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
          />
          {errors.company && (
            <span className="text-red-500 text-sm">{errors.company.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            placeholder="Enter Color"
            id="color"
            {...register("color", {
              required: "Color is required",
              minLength: {
                value: 3,
                message: "Color must be at least 3 characters long",
              },
            })}
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
          />
          {errors.color && (
            <span className="text-red-500 text-sm">{errors.color.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="border-[2px] border-gray-300 rounded-lg w-full px-4 py-2 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {error && (
          <div className="text-center text-red-500 text-xl">{error}</div>
        )}

        <button
          type="submit"
          className={`max-w-3xl font-semibold text-white text-2xl  ${
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
