import { useMyContext } from "../context/eventsContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CompanyCard } from "../components/CompanyCard";

export function CompanyPage() {
  const { companies } = useMyContext();

  if (companies.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white 2xl">There are no companies yet</h1>
      </div>
    );

  return (
    <div className="text-white">
      <header className="flex justify-between py-4 ">
        <h1 className="text-2xl text-gray-300 font-bold">
          Companies[{companies.length}]
        </h1>
        <div className="inline-flex  items-center p-2 mb-2 rounded-sm bg-slate-700 gap-2">
          <AiOutlinePlus className="font-extrabold" />
          <Link to="/companies/new">Create new Company</Link>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {companies.map((company) => (
          <CompanyCard company={company} key={company._id} />
        ))}
      </div>
    </div>
  );
}
