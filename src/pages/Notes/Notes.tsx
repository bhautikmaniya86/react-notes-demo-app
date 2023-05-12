import React, { useState } from "react";
import Note from "../../components/Note/Note";
import styles from "./notes.module.css";
import AddNotes from "../../components/AddNotes/AddNotes";
import { Add } from "@mui/icons-material";

export interface Notes {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("");
  const [mode, setMode] = useState<"editMode" | "viewMode" | "addMode">(
    "addMode"
  );

  return (
    <div className={styles.notesApp}>
      <div className={styles.title}>
        <h1>Notes</h1>
        <button className={styles.addNotes} onClick={() => setMode("addMode")}>
          <Add />
        </button>
      </div>

      <AddNotes
        setNotes={setNotes}
        notes={notes}
        mode={mode}
        currentNoteId={currentNoteId}
        setMode={setMode}
      />

      <Note
        notes={notes}
        setNotes={setNotes}
        setMode={setMode}
        setCurrentNoteId={setCurrentNoteId}
      />
    </div>
  );
};

export default NotesApp;
