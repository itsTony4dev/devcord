import Conversations from "./Conversations";

import { CiLogout } from "react-icons/ci";
import SearchInput from "./SearchInput";
import { useLogout } from "../../hooks/useLogout";

const Sidebar = () => {
  const { logout, loading } = useLogout();
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      {!loading ? (
        <button type="submit" className=" btn w-1/4 mt-auto">
          <CiLogout className="w-6 h-6" onClick={logout} />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default Sidebar;
