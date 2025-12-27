import { useState, useEffect } from "react";
import Api from "./Api";

function Notes( {token} )
{

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");  
    const [filterTag, setFilterTag] = useState("");


    const fetchNotes = async (tag = "") => {
        // const res = await fetch(`http://localhost:9876/notes?tag=${tag}`, {
        //     method: "GET",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //     },
        // });

        // const data = await res.json();

        const {data} = await Api(`/notes?tag=${tag}`, "GET", null, token);

        setNotes(data);
    };

    const addNote = async () => {
        
        if(!title && !tags && !content)
        {
            return;
        }

        // await fetch("http://localhost:9876/notes", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token,
        //     },
        //     body: JSON.stringify({
        //         title, 
        //         content, 
        //         tags: tags.split(",").map(t => t.trim()),
        //     }),
        // });

        await Api("/notes", "POST", { title: title, content: content, tags: tags.split(",").map(t => t.trim())}, token)

        setTitle("");
        setContent("");
        setTags("");

        fetchNotes();
    }

    useEffect( () => {
        fetchNotes();
    }, []);


    const deleteNote = async (id) => {
        // await fetch(`http://localhost:9876/notes/${id}`, {
        //     method: "DELETE",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //     },
        // });

        await Api(`/notes/${id}`, "DELETE", null, token)

        fetchNotes();
    }

    const [editNoteId, setEditNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTags, setEditTags] = useState("");

    const editNote = async ( id ) => {
        // await fetch(`http://localhost:9876/notes/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + token,
        //     },
        //     body: JSON.stringify({ 
        //         title: editTitle, 
        //         content: editContent, 
        //         tags: editTags.split(",").map((t) => t.trim()),
        //     }),
        // });

        await Api(`/notes/${id}`, "PUT", { title: editTitle, content: editContent, tags: editTags.split(",").map(t => t.trim())}, token)

        setEditNoteId(null);
        setEditTitle("");
        setEditContent("");
        setEditTags("");

        fetchNotes();
    };

    const resetFilter = () => {
        setFilterTag("");
        fetchNotes();
    }

    return (
        <>
            <h4>Add Notes</h4>

            <input 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input 
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input 
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />     

            <button onClick={addNote}>Add Note</button>

            <hr/>

            <input
                placeholder="Filter by tag"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
            />

            <button onClick={() => fetchNotes(filterTag) }> Filter </button>

            <button onClick={ resetFilter }>Reset Filter</button>

            {/* map must return is used inside {} can use return with {} or direct () */}
            <ul>

            {notes.map((note) => (
                <li key={note._id} style={{background: "", padding:10, margin: 5}}>

                {editNoteId === note._id ? (
                    <>
                        <input
                            // placeholder="Edit title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <input
                            // placeholder="Edit content"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />

                        <input
                            // placeholder="Edit title"
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                        />

                        <button onClick={ () => editNote(editNoteId) }>Save</button>

                    </>
                ) : (
                    <>
                        <strong> {note.title} </strong>

                        <button onClick={ () => {
                            setEditNoteId(note._id);
                            setEditTitle(note.title);
                            setEditContent(note.content);
                            setEditTags(note.tags.join(", "));
                            }}>✏️
                        </button>

                        <button onClick={ () => deleteNote(note._id) }>❌</button>

                        <div>{note.content}</div>

                        <small>{note.tags.join(", ")}</small>
                    </>
                )}

                </li>
            ))}

            </ul>
        </>
    );
}

export default Notes;