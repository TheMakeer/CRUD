import { toast } from "react-hot-toast";
import { useMyContext } from "../context/eventsContext";
import { useNavigate } from "react-router-dom";

export function ParticipantCard({ participant }) {

  const { deleteParticipant } = useMyContext();
  const navigate = useNavigate()

  const handleDelete = (participant) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            "Confirm" to delete <strong>{participant.name}</strong>
          </p>
          <div>
            <button
              className="text-white px-3 py-2
                    hover:text-green-500 rounded-sm mx-2"
              onClick={() => {
                  deleteParticipant(participant._id)
                  toast.dismiss(t.id);
                }}
            >
              Confirm
            </button>
            <button
              className="bg-red-700 hover:bg-red-600 px-3 py-2
                    text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
        className="bg-zinc-800 text-white shadow-black
                 hover:bg-zinc-700 hover:cursor-pointer "
        onClick={() => navigate(`/participants/${participant._id}`)}
    >
      <div className="px-4 py-7">
        <h3 className="font-bold">{participant.first_name} {participant.last_name}</h3>
        <p><strong>Email:</strong> {participant.email}</p>
        <p><strong>Phone:</strong> {participant.phone}</p>
        <button
          className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm mt-3"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(participant)
          
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
