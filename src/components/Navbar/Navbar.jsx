import { Link } from "react-router-dom";
import useQuestionStore from "../../store/zustand";

function Navbar() {
  const { auth, logoutUser } = useQuestionStore();

  return (
    <nav className="w-full bg-transparent text-neutral-900 px-5 md:px-10 flex items-center justify-between py-5 text-sm border-b-slate-200 border">
      <h1 className="text-violet-700 text-2xl font-bold tracking-tight flex items-center gap-1">
      The <span className="text-green-600">Daily</span> MS <span className="text-green-600">Excel</span>  Quiz 
      </h1>
      <div className="space-x-5">
        {!auth?.email && (
          <Link
            className="py-2 px-5 text-violet-500 font-semibold border rounded-full border-violet-500 hover:bg-violet-600 hover:text-white"
            to={"/login"}
          >
            Login
          </Link>
        )}
        {auth?.email ? (
          <button
            className="py-2 transition px-5 text-white font-semibold rounded-full bg-red-600 hover:bg-red-700"
            onClick={logoutUser}
          >
            Logout
          </button>
        ) : (
          <Link
            className="py-2 transition px-5 text-white font-semibold rounded-full bg-violet-600 hover:bg-violet-800"
            to={"/register"}
          >
            Register
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
