import { useNavigate } from "react-router";
import { AuthContextType, useAuth } from "./auth/AuthProvider";
import { useAddAnimeToList } from "./useAddAnimeToList";
import { MdFormatListBulletedAdd } from "react-icons/md";

export const AddAnimeToListBtn = ({ malId }: { malId: string }) => {
  const { userInfo } = useAuth() as AuthContextType;
  const { addAnimeToUserList } = useAddAnimeToList(malId);
  const navigate = useNavigate();

  const handleAddToUserList = () => {
    if (!userInfo) navigate("/login");
    addAnimeToUserList();
  };

  return (
    <button
      className="bg-otherPurple w-fit p-1 px-3 rounded-md flex items-center gap-2"
      onClick={handleAddToUserList}>
      <MdFormatListBulletedAdd size="1.2rem" /> Add to list
    </button>
  );
};
