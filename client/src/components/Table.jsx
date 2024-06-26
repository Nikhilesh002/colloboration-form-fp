import axios from "axios";
import { useEffect, useState } from "react";

function Table() {
  const [collabs, setCollabs] = useState([]);
  const [filteredCollabs, setFilteredCollabs] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState(["all", "all"]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedNature, setSelectedNature] = useState("all");
  const [natures, setNatures] = useState([]);

  useEffect(() => {
    // get data
    axios
      .get("http://localhost:3001/api/collab")
      .then((response) => {
        setCollabs(response.data);
        setFilteredCollabs(response.data);
        setNatures(getUniqueNatures(response.data));
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  useEffect(() => {
    let filtered = collabs;

    if (selectedBranches[0] !== "all" || selectedBranches[1] !== "all") {
      if (selectedBranches[0] !== "all" && selectedBranches[1] !== "all") {
        filtered = filtered.filter((collab) => {
          return selectedBranches.every((branch) =>
            collab.branch.toLowerCase().includes(branch.toLowerCase())
          );
        });
      } else {
        const branch = selectedBranches.find((branch) => branch !== "all");
        filtered = filtered.filter((collab) =>
          collab.branch.toLowerCase().includes(branch.toLowerCase())
        );
      }
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((collab) => {
        const startYear = new Date(collab.start_date).getFullYear();
        return startYear == selectedYear;
      });
    }

    if (selectedNature !== "all") {
      filtered = filtered.filter(
        (collab) => collab.nature.toLowerCase() === selectedNature.toLowerCase()
      );
    }

    setFilteredCollabs(filtered);
  }, [selectedBranches, selectedYear, selectedNature, collabs]);

  const handleBranchChange = (event, index) => {
    const newSelectedBranches = [...selectedBranches];
    newSelectedBranches[index] = event.target.value.toLowerCase();
    setSelectedBranches(newSelectedBranches);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value.toLowerCase());
  };

  const handleNatureChange = (event) => {
    setSelectedNature(event.target.value.toLowerCase());
  };

  // do duration
  const formatDuration = (start, end) => {
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    const sY = Number(startYear);
    const eY = Number(endYear);
    return eY - sY;
  };

  // unique years
  const getUniqueYears = () => {
    let years = collabs.map((collab) => new Date(collab.start_date).getFullYear());
    years = Array.from(new Set(years)).sort();
    return years;
  };

  // unique natures
  const getUniqueNatures = (collabs) => {
    const natures = collabs.map((collab) => collab.nature.toLowerCase());
    return Array.from(new Set(natures));
  };

  function handlePrint() {
    window.print();
  }

  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold mb-5">Collaboration Projects</h1>

      <div className="mb-5">
        <label htmlFor="nature" className="mr-3">
          Filter by Nature:
        </label>
        <select
          id="nature"
          value={selectedNature}
          onChange={handleNatureChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
          {natures.map((nature) => (
            <option key={nature} value={nature}>
              {nature}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="branch1" className="mr-3">
          Filter by Branch 1:
        </label>
        <select
          id="branch1"
          value={selectedBranches[0]}
          onChange={(e) => handleBranchChange(e, 0)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="csbs">CSBS</option>
          <option value="cse">CSE</option>
          <option value="aiml">AIML</option>
          <option value="iot">IoT</option>
          <option value="eie">EIE</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="branch2" className="mr-3">
          Filter by Branch 2:
        </label>
        <select
          id="branch2"
          value={selectedBranches[1]}
          onChange={(e) => handleBranchChange(e, 1)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="csbs">CSBS</option>
          <option value="cse">CSE</option>
          <option value="aiml">AIML</option>
          <option value="iot">IoT</option>
          <option value="eie">EIE</option>
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="year" className="mr-3">
          Filter by Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
          {getUniqueYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mx-auto">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="py-3 px-4 border-b-2 border-gray-600">S.No</th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Title of the collaborative activity
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Name of the collaborating agency
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Name of the participant
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Year of collaboration
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">Duration</th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Nature of the activity
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Link to the relevant document
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-600">
                Branches
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCollabs.map((collab, index) => (
              <tr key={collab.collab_id} className="border-b border-gray-200">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{collab.title}</td>
                <td className="py-3 px-4">{collab.name_of_collab}</td>
                <td className="py-3 px-4">{collab.participants}</td>
                <td className="py-3 px-4">
                  {new Date(collab.start_date).getFullYear()}
                </td>
                <td className="py-3 px-4">
                  {formatDuration(collab.start_date, collab.end_date)}
                </td>
                <td className="py-3 px-4">{collab.nature}</td>
                <td className="py-3 px-4">
                  <a
                    target="__blank"
                    href={collab.link}
                    className="text-blue-500 hover:underline"
                  >
                    Paper Link
                  </a>
                </td>
                <td className="py-3 px-4">{collab.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="bg-blue-600 text-white px-3 py-1 rounded mt-5 text-lg "
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
}

export default Table;
