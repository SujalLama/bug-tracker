import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch projects");
        setProjects(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  async function logout() {
    localStorage.clear();
    navigate("/login");
  }
  console.log(projects);
  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "ALL" || p.status === statusFilter),
  );

  // const filteredProjects = [];
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  console.log(filteredProjects, "filteredProjects");

  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Your Projects</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white border hover:border-blue-500 shadow-md hover:shadow-lg transition rounded-xl p-5 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {project.description}
              </p>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-0.5 rounded text-white text-xs font-semibold ${
                    project.status === "ACTIVE" ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Manager:</span>{" "}
                {project.manager.username}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Team Members:</span>{" "}
                {project.projectMembers.length}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No projects found!
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-2 rounded border shadow-sm ${
                  page === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Project } from "../types";
//
// const Dashboard = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:3000/api/projects", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//
//         const data = await res.json();
//         if (!res.ok)
//           throw new Error(data.message || "Failed to fetch projects");
//         setProjects(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchProjects();
//   }, []);
//
//   async function logout() {
//     localStorage.clear();
//     navigate("/login");
//   }
//
//   if (loading) return <div className="p-4">Loading...</div>;
//
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">🚀 Your Projects</h1>
//         <button
//           onClick={logout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
//         >
//           Logout
//         </button>
//       </div>
//
//       {projects.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               onClick={() => navigate(`/projects/${project.id}`)}
//               className="bg-white border hover:border-blue-500 shadow-md hover:shadow-lg transition rounded-xl p-5 cursor-pointer"
//             >
//               <h2 className="text-xl font-semibold text-gray-900 mb-1">
//                 {project.name}
//               </h2>
//               <p className="text-sm text-gray-600 mb-2">
//                 {project.description}
//               </p>
//               <div className="text-sm text-gray-700 mb-1">
//                 <span className="font-medium">Status:</span>{" "}
//                 <span
//                   className={`inline-block px-2 py-0.5 rounded text-white text-xs font-semibold ${
//                     project.status === "ACTIVE" ? "bg-green-500" : "bg-gray-400"
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>
//               <div className="text-sm text-gray-700 mb-1">
//                 <span className="font-medium">Manager:</span>{" "}
//                 {project.manager.username}
//               </div>
//               <div className="text-sm text-gray-700">
//                 <span className="font-medium">Team Members:</span>{" "}
//                 {project.projectMembers.length}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500 mt-10">
//           No projects found!
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Dashboard;
