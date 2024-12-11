import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Data() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://rf-json-server.herokuapp.com/events"
        );
        if (!response?.data) return null;
        //sorting by company name
        const sortedResult = response?.data.sort((a, b) =>
          a.company.localeCompare(b.company)
        );
        setData(sortedResult);
        setError(null);
        console.log("Sorted Result", sortedResult);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`https://rf-json-server.herokuapp.com/events/${id}`);
      setData(data.filter((item) => item.id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Fetching ...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching data</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 flex flex-col justify-center items-center gap-10">
      <h2 className="text-5xl max-md:text-3xl font-semibold text-center">
        Get All Data
      </h2>
      <Link to="/add">
        <button className="font-semibold text-white text-2xl max-md:text-xl bg-[#008AF2] text-center px-4 py-2 rounded-lg">
          Add New Data
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch gap-14">
        {data.map((item) => (
          <div
            key={item.id}
            className="text-center border border-[#008AF2] max-w-[350px] px-4 py-6 flex flex-col items-center gap-2 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl text-[#008AF2]">{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.company}</p>
            <p>{item.color}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.address}</p>
            <p>{item.isActive}</p>
            <p>{item.date}</p>
            <p>{item.time}</p>
            <img
              src={item.image}
              width={50}
              height={50}
              className="object-cover"
              alt="image"
            />
            <p>{item.createdOn}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to={`/edit/${item.id}`}>
                <button className="font-semibold text-white text-base bg-green-500 text-center px-4 py-2 rounded-lg">
                  Edit
                </button>
              </Link>
              <button
                className="font-semibold text-white text-base bg-red-500 text-center px-4 py-2 rounded-lg"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
