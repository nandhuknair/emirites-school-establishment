"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from "../src/assets/esclogo.png";

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

export default function LandingPage() {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLmsPassword, setShowLmsPassword] = useState(false);
  const [showAlefPassword, setShowAlefPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchStudentData(studentId);
      if (data) {
        setStudentData(data);
      } else {
        setError("Student not found");
        setStudentData(null);
      }
    } catch (err) {
      setError("An error occurred while fetching student data");
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "lms") {
      setShowLmsPassword(!showLmsPassword);
    } else {
      setShowAlefPassword(!showAlefPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1] flex flex-col items-center  p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header with logo and title */}
        <div className="flex flex-col items-center justify-between ">
          {/* Add your logo here */}
          <img src={logo} alt="Logo" className="h-4 w-4" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <p className="text-[#A9A7A0] text-xs sm:text-sm mb-4 sm:mb-6 text-center">
              Al Khalil Bin Ahmed Secondary School - C3
            </p>
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
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <p className="text-[#6E6658] mt-4 text-center text-xs sm:text-sm">
                {error}
              </p>
            )}

            {studentData && (
              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-normal mb-3 sm:mb-4 text-[#6E6658]">
                  Student Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(studentData).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-[#F5ECE6]/70 backdrop-blur-sm p-2 sm:p-3 rounded-md"
                    >
                      <p className="font-normal text-[#A9A7A0] text-xs capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[#6E6658] text-xs sm:text-sm flex-grow">
                          {key === "lmsPassword"
                            ? showLmsPassword
                              ? value
                              : "********"
                            : key === "alefPassword"
                            ? showAlefPassword
                              ? value
                              : "********"
                            : value}
                        </p>
                        {(key === "lmsPassword" || key === "alefPassword") && (
                          <button
                            onClick={() =>
                              togglePasswordVisibility(
                                key === "lmsPassword" ? "lms" : "alef"
                              )
                            }
                            className="ml-2 text-[#6E6658] hover:text-[#A9A7A0] transition-colors duration-200"
                          >
                            {(key === "lmsPassword" && showLmsPassword) ||
                            (key === "alefPassword" && showAlefPassword) ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
