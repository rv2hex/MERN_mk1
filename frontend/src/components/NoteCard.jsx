import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import api from "../lib/axios";
import toast from 'react-hot-toast'

const NoteCard = ({ note, onDelete,setNotes }) => {
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent bubbling to Link
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Note deleted successfully");
      if (onDelete) onDelete(id); // Optional callback to update UI
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#38bdf8]">
      <div className="card-body">
        <Link to={`/note/${note._id}`} className="flex-1">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </Link>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
