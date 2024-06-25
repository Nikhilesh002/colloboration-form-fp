import axios from "axios";
import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    collab_id: "",
    title: "",
    name_of_collab: "",
    participants: "",
    start_date: "",
    end_date: "",
    nature: "",
    link: "",
    branch: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      collab_id: Date.now().toString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0]; // format as YYYY-MM-DD
    const finalData = { ...formData, created_date: currentDate };

    // Adjust start and end years based on the month
    const adjustYear = (date) => {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      return month >= 7 ? year : year-1;
    };

    finalData.start_year = adjustYear(finalData.start_date);
    finalData.end_year = adjustYear(finalData.end_date);

    axios
      .post("http://localhost:3001/api/collabs", finalData)
      .then((response) => {
        alert("Data posted successfully");
        setFormData({
          collab_id: "",
          title: "",
          name_of_collab: "",
          participants: "",
          start_date: "",
          end_date: "",
          nature: "",
          link: "",
          branch: "",
        });
      })
      .catch((error) => {
        console.error("There was an error posting the data!", error);
        alert("There was an error posting the data. Please try again.");
      });
  };

  return (
    <div className="p-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-5 text-center text-blue-600">
        Add New Collaboration
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Title of the collaborative activity:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name of the collaborating agency:
          </label>
          <input
            type="text"
            name="name_of_collab"
            value={formData.name_of_collab}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name of the participant:
          </label>
          <input
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Start Date:
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            End Date:
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nature of the activity:
          </label>
          <input
            type="text"
            name="nature"
            value={formData.nature}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Link to the relevant document:
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Branches:
          </label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
