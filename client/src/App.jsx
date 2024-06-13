import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [collabs, setCollabs] = useState([]);
    const [filteredCollabs, setFilteredCollabs] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');

    useEffect(() => {
        axios.get('http://localhost:3001/api/collabs')
            .then(response => {
                setCollabs(response.data);
                setFilteredCollabs(response.data); // Initialize filteredCollabs with all data
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    useEffect(() => {
        let filtered = collabs;

        if (selectedBranch !== 'All') {
            filtered = filtered.filter(collab => collab.branch.toLowerCase().includes(selectedBranch.toLowerCase()));
        }

        if (selectedYear !== 'All') {
            filtered = filtered.filter(collab => {
                const startYear = new Date(collab.start_date).getFullYear();
                const endYear = new Date(collab.end_date).getFullYear();
                return startYear <= selectedYear && endYear >= selectedYear;
            });
        }

        setFilteredCollabs(filtered);
    }, [selectedBranch, selectedYear, collabs]);

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Function to format the duration between start and end dates
    const formatDuration = (start, end) => {
        const startYear = new Date(start).getFullYear();
        const endYear = new Date(end).getFullYear();
        return `${startYear} - ${endYear}`;
    };

    // Get unique years from collabs data for the year filter dropdown
    const getUniqueYears = () => {
        let years = collabs.flatMap(collab => [
            new Date(collab.start_date).getFullYear(),
            new Date(collab.end_date).getFullYear(),
        ]);
        years=Array.from(new Set(years)).sort();
        const minYr=parseInt(years[0]);
        let maxYr=parseInt(years[years.length-1]);
        let yr=[]
        for(let i=minYr;i<=maxYr;i++){
          yr.push(i);
        }
        return yr;
    };

    function handlePrint(){
      window.print();
    }

    return (
        <div className="p-5 text-center">
            <h1 className="text-3xl font-bold mb-5">Collaboration Projects</h1>

            <div className="mb-5">
                <label htmlFor="branch" className="mr-3">Filter by Branch:</label>
                <select
                    id="branch"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="All">All</option>
                    <option value="csbs">CSBS</option>
                    <option value="cse">CSE</option>
                    <option value="aiml">AIML</option>
                    <option value="iot">IoT</option>
                    <option value="eie">EIE</option>
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="year" className="mr-3">Filter by Year:</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="border border-gray-300 rounded px-3 py-2"
                >
                    <option value="All">All</option>
                    {getUniqueYears().map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white mx-auto">
                    <thead>
                        <tr className="w-full bg-gray-800 text-white">
                            <th className="py-3 px-4 border-b-2 border-gray-600">Title</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Team</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Participants</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Duration</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Nature</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Link</th>
                            <th className="py-3 px-4 border-b-2 border-gray-600">Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCollabs.map(collab => (
                            <tr key={collab.collab_id} className="border-b border-gray-200">
                                <td className="py-3 px-4">{collab.title}</td>
                                <td className="py-3 px-4">{collab.name_of_collab}</td>
                                <td className="py-3 px-4">{collab.participants}</td>
                                <td className="py-3 px-4">
                                    {formatDuration(collab.start_date, collab.end_date)}
                                </td>
                                <td className="py-3 px-4">{collab.nature}</td>
                                <td className="py-3 px-4">
                                    <a href={collab.link} className="text-blue-500 hover:underline">Project Link</a>
                                </td>
                                <td className="py-3 px-4">{collab.branch}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className='bg-blue-600 text-white px-3 py-1 rounded mt-5 text-lg ' onClick={handlePrint}>Print</button>
        </div>
    );
}

export default App;
