import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("https://secure-notes-app-hm1u.onrender.com/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    const encrypted = CryptoJS.AES.encrypt(
      content,
      "secret-key"
    ).toString();

    await axios.post(
      "https://secure-notes-app-hm1u.onrender.com/api/notes",
      { title, content: encrypted },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(
      `https://secure-notes-app-hm1u.onrender.com/api/notes/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
  <h2 className="text-lg font-semibold">Secure Notes</h2>

  <div className="flex items-center gap-3">
    <button
      onClick={logout}
      className="text-sm hover:underline"
    >
      Logout
    </button>

    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-semibold">
      U
    </div>
  </div>
</div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {/* Add Note */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-3">Add Note</h3>

          <input
            placeholder="Note Title"
            className="w-full border p-2 mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Note Content"
            className="w-full border p-2 mb-3 rounded"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{note.title}</h4>
              <p className="text-sm text-gray-500">
                Short preview of the note content
              </p>
            </div>

            <button
              onClick={() => deleteNote(note._id)}
              className="text-gray-500 hover:text-red-500"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
