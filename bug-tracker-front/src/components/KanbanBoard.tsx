import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Ticket, ItemTypes } from "../types";
import { useDrag, useDrop } from "react-dnd";

const statusColumns = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const KanbanBoard = () => {
  const { id } = useParams<{ id: string }>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTickets(data);
      setLoading(false);
    };
    fetchTickets();
  }, [id]);

  const moveTicket = async (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);

    // Persist status change
    await fetch(`http://localhost:3000/api/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const getColumnTickets = (status: string) =>
    tickets.filter((t) => t.status === status);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">
      {statusColumns.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          tickets={getColumnTickets(status)}
          moveTicket={moveTicket}
        />
      ))}
    </div>
  );
};

const StatusColumn = ({ status, tickets, moveTicket }: any) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.TICKET,
    drop: (item: any) => {
      moveTicket(item.id, status);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-white rounded-2xl p-5 min-h-[550px] shadow-lg border border-gray-100 flex flex-col ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-800 uppercase tracking-wide border-b pb-2">
        {status.replace("_", " ")}
      </h3>

      {tickets.map((ticket, index) => (
        <TicketItem key={ticket.id} ticket={ticket} moveTicket={moveTicket} />
      ))}
    </div>
  );
};

const TicketItem = ({ ticket, moveTicket }: any) => {
  const [, drag] = useDrag({
    type: ItemTypes.TICKET,
    item: { id: ticket.id },
  });

  return (
    <div
      ref={drag}
      className="bg-gray-50 hover:bg-gray-100 transition-all rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
    >
      <div className="font-medium text-gray-900 text-sm mb-1 truncate">
        {ticket.title}
      </div>
      <div className="text-xs text-gray-600 font-medium">
        🎯 Priority: <span className="text-blue-600">{ticket.priority}</span>
      </div>
    </div>
  );
};

export default KanbanBoard;
