import { toast } from "react-hot-toast";
import { useMyContext } from "../context/eventsContext";
import { useNavigate } from "react-router-dom";

export function CompanyCard({ company }) {

  const { deleteCompany } = useMyContext();
  const navigate = useNavigate()

  const handleDelete = (company) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            "Confirm" to delete <strong>{company.name}</strong>
          </p>
          <div>
            <button
              className="text-white px-3 py-2
                    hover:text-green-500 rounded-sm mx-2"
              onClick={() => {
                  deleteCompany(company._id)
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
        onClick={() => navigate(`/companies/${company._id}`)}
    >
      <div className="px-4 py-7">
        <h3 className="font-bold">{company.name}</h3>
        <p><strong>Status:</strong> {company.status}</p>
        <p><strong>Profile Completed:</strong> {company.status}</p>
        <button
          className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm mt-3"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(company)
          
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
