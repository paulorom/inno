import { Search, Home} from "react-feather";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ setShowSearch }) => {
  return (
    <div className="w-16 h-screen bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center py-5 fixed left-0 top-0 z-50">
      <div className="flex justify-center w-12 h-12 mb-10 relative">
        <Image src="/logo.png" alt="Innoscripta" width={20} height={30} className="h-fit" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 space-y-8 -mt-16">
        <button onClick={() => setShowSearch(true)} className="text-white text-2xl hover:opacity-80">
          <Search />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
