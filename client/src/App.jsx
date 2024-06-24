import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Form from "./components/Form";
import Table from "./components/Table";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <header className="p-5 bg-gray-800 text-white">
          <nav>
            <ul className="flex justify-center space-x-4">
              <li>
                <Link to="/table" className="text-lg font-bold hover:underline">
                  Table
                </Link>
              </li>
              <li>
                <Link to="/form" className="text-lg font-bold hover:underline">
                  Form
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/table" element={<Table />} />
            <Route exact path="/form" element={<Form />} />
            <Route exact path="/" element={<Table />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
