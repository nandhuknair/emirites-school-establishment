import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../src/assets/esclogo.png";
import bottomLogo from "../src/assets/ministryLogo.png"; // Import your bottom logo here

// Mock function to simulate fetching student data
const fetchStudentData = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const students = {
    12345: {
      firstName: "John",
      secondName: "Michael",
      lastName: "Doe",
      grade: "10",
      section: "A",
      email1: "john.doe@example.com",
      lmsPassword: "lms123",
      email2: "john.doe2@example.com",
      alefPassword: "alef456",
    },
    67890: {
      firstName: "Jane",
      secondName: "Elizabeth",
      lastName: "Smith",
      grade: "11",
      section: "B",
      email1: "jane.smith@example.com",
      lmsPassword: "lms789",
      email2: "jane.smith2@example.com",
      alefPassword: "alef012",
    },
  };
  return students[id] || null;
};

export default function FrontPage() { 
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchStudentData(studentId);
      if (data) {
        navigate(`/student/${studentId}`); // Navigate to the StudentDetails page
      } else {
        setError("Student not found");
      }
    } catch (err) {
      setError("An error occurred while fetching student data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1] flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="flex flex-col items-center justify-between ">
          <img src={logo} alt="Logo" className="h-4 w-4" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="flex-grow bg-[#F5ECE6] border-transparent focus:border-[#B2B0A1] focus:ring-[#B2B0A1] placeholder-[#A9A7A0] text-[#6E6658] rounded-md p-2 outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#6E6658] hover:bg-[#A9A7A0] text-white font-normal py-2 px-4 rounded-md transition-colors duration-200 text-sm ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Loading..." : "View Details"}
                </button>
              </div>
            </form>

            {error && (
              <p className="text-[#6E6658] mt-4 text-center text-xs sm:text-sm">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="flex justify-center mt-4">
          <img src={bottomLogo} alt="Bottom Logo" className="" /> {/* Adjust size as needed */}
        </div>
        
      </div>
    </div>
  );
}
