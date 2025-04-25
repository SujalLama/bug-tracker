import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatModal from "../components/ChatModal";
import KanbanBoard from "../components/KanbanBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TicketModal from "../components/TicketModal";

const Project = () => {
  const { id: projectId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const [project, setProject] = useState<{ name: string; id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const projectRes = await fetch(
        `http://localhost:3000/api/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const projectData = await projectRes.json();
      setProject(projectData);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm"
          >
            ← Back
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Project: <span className="text-blue-600">{project?.name}</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowChat(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
          >
            💬 Chat
          </button>
          <button
            onClick={() => setShowTicketModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition"
          >
            ➕ Add Ticket
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">🗂️ Tickets</h3>
      <DndProvider backend={HTML5Backend}>
        <KanbanBoard />
      </DndProvider>

      {showChat && (
        <ChatModal projectId={projectId!} onClose={() => setShowChat(false)} />
      )}

      {showTicketModal && (
        <TicketModal
          projectId={projectId!}
          onClose={() => setShowTicketModal(false)}
        />
      )}
    </div>
  );
};

export default Project;
