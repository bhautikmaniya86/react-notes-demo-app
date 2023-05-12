import React, { useEffect, useState } from "react";
import { Cancel } from "@mui/icons-material";
import styles from "./addNotes.module.css";
import { Notes } from "../../pages/Notes/Notes";

interface AddNotesProps {
  mode: "editMode" | "viewMode" | "addMode";
  setNotes: (notes: Notes[]) => void;
  notes: Notes[];
  currentNoteId: string;
  setMode: (mode: any) => void;
}

const AddNotes = ({
  mode,
  setNotes,
  notes,
  currentNoteId,
  setMode,
}: AddNotesProps) => {
  const [newNote, setNewNote] = useState<Notes>(
    mode !== "addMode" && notes.length
      ? (notes.find((note) => note.id === currentNoteId) as Notes)
      : {
          id: "",
          title: "",
          body: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
  );

  /**
   * useEffect for setting and resetting state
   */
  useEffect(() => {
    if (currentNoteId && mode !== "addMode" && notes.length) {
      setNewNote(notes.find((note) => note.id === currentNoteId) as Notes);
    } else {
      setNewNote({
        id: "",
        title: "",
        body: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }, [currentNoteId, notes, mode]);

  const handelChange = (e: any) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const addNote = (e: any) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        ...newNote,
        id: `${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    setMode("");
  };

  const editNote = (e: any) => {
    e.preventDefault();
    const noteIndex = notes.findIndex((note) => note.id === currentNoteId);
    const _notes = [...notes];
    _notes.splice(noteIndex, 1, { ...newNote, updatedAt: new Date() });
    setNotes(_notes);
    setMode("");
  };

  return (
    <>
      {mode && (
        <>
          <div className={styles.notesBackground} onClick={() => setMode("")} />
          <div className={styles.addNotes}>
            <div className={styles.cancel}>
              <Cancel htmlColor="#e1e1e1" onClick={() => setMode("")} />
            </div>
            <form>
              <div>
                <input
                  readOnly={mode === "viewMode"}
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={handelChange}
                  value={newNote?.title}
                />
              </div>
              <div>
                <textarea
                  readOnly={mode === "viewMode"}
                  name="body"
                  placeholder="Description"
                  rows={10}
                  onChange={handelChange}
                  value={newNote?.body}
                />
              </div>
              {mode !== "viewMode" && (
                <div className={styles.action}>
                  <button onClick={mode === "addMode" ? addNote : editNote}>
                    {mode === "addMode" ? "Save" : "Update"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddNotes;
