import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NotesCard from '../components/NoteCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../components/footer';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/notes");
        setNotes(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching notes", error);
        toast.error("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-10'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {!loading && notes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NotesCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        ) : (
          !loading && <div className='text-center text-gray-500 py-10'>No notes found.</div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
