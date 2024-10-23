import React from 'react';
import { useParams } from 'react-router-dom';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

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

const StudentDetailsPage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // State to manage password visibility
  const [showLmsPassword, setShowLmsPassword] = React.useState(false);
  const [showAlefPassword, setShowAlefPassword] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData(id);
        if (data) {
          setStudentData(data);
        } else {
          setError("Student not found");
        }
      } catch (err) {
        setError("An error occurred while fetching student data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to toggle password visibility
  const togglePasswordVisibility = (type) => {
    if (type === "lms") {
      setShowLmsPassword((prev) => !prev);
    } else {
      setShowAlefPassword((prev) => !prev);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6DDD7] via-[#F5ECE6] to-[#B2B0A1]  p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden p-4 sm:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <h3 className="text-2xl font-normal mb-3 text-[#6E6658]">Student Details</h3> 
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(studentData).map(([key, value]) => (
              <div key={key} className="bg-[#F5ECE6]/70 backdrop-blur-sm p-2 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-[#6E6658] text-sm flex-grow">
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
                        togglePasswordVisibility(key === "lmsPassword" ? "lms" : "alef")
                      }
                      className="ml-2 text-[#6E6658] hover:text-[#A9A7A0] transition-colors duration-200"
                    >
                      {(key === "lmsPassword" && showLmsPassword) ||
                      (key === "alefPassword" && showAlefPassword) ? (
                        <EyeOffIcon className="h-5 w-5" /> 
                      ) : (
                        <EyeIcon className="h-5 w-5" /> 
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default StudentDetailsPage;
