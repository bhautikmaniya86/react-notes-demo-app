import React, { useMemo, useState } from "react";
import { Notes } from "../../pages/Notes/Notes";
import { RemoveRedEye, Delete, Edit } from "@mui/icons-material";

import styles from "./note.module.css";

interface NoteProps {
  notes: Notes[];
  setMode: (mode: any) => void;
  setCurrentNoteId: (id: string) => void;
  setNotes: (notes: Notes[]) => void;
}

const Note = ({ notes, setMode, setCurrentNoteId, setNotes }: NoteProps) => {
  const [searchText, setSearchText] = useState<string>("");

  // state for sorting
  const [sortingValue, setSortingValue] = useState<{
    option: "createdAt" | "updatedAt" | "title";
    order: "desc" | "asc";
  }>({ option: "createdAt", order: "desc" });

  /**
   *
   * @param noteToDeleteId
   */
  const deleteNote = (noteToDeleteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteToDeleteId));
  };

  // useMemo hook to perform sorting and searching
  const filteredNotes = useMemo(() => {
    /**
     * sorting function
     */
    const sortedNotes = notes.sort((a: any, b: any) => {
      const { order, option } = sortingValue;
      if (order === "asc") {
        return option === "title"
          ? a.title.localeCompare(b.title)
          : a[option] - b[option];
      } else {
        return option === "title"
          ? b.title.localeCompare(a.title)
          : b[option] - a[option];
      }
    });

    /**
     * searching function
     */
    return sortedNotes.filter(
      (note) =>
        !searchText ||
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.body.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [notes, sortingValue, searchText]);

  return (
    <div className={styles.note}>
      <div className={styles.searchandSort}>
        <div className={styles.sort}>
          <select
            name="filter_options"
            onChange={(e) =>
              setSortingValue({
                ...sortingValue,
                option: e.target.value as any,
              })
            }
          >
            <option value={"title"}>Title</option>
            <option value={"createdAt"}>Created At</option>
            <option value={"updatedAt"}>Updated At</option>
          </select>
          <select
            name="filter_order"
            onChange={(e) =>
              setSortingValue({
                ...sortingValue,
                order: e.target.value as any,
              })
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className={styles.search}>
          <input
            placeholder="search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.length ? (
              filteredNotes.map((note: Notes) => (
                <tr>
                  <td>{note.title}</td>
                  <td>{note.body}</td>
                  <td>{note.createdAt.toLocaleString()}</td>
                  <td>{note.updatedAt.toLocaleString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        onClick={() => {
                          setMode("viewMode");
                          setCurrentNoteId(note.id);
                        }}
                      >
                        <RemoveRedEye sx={{ fontSize: 17 }} />
                      </button>
                      <button
                        onClick={() => {
                          setMode("editMode");
                          setCurrentNoteId(note.id);
                        }}
                      >
                        <Edit sx={{ fontSize: 17 }} />
                      </button>
                      <button onClick={() => deleteNote(note.id)}>
                        <Delete sx={{ fontSize: 17 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div className={styles.noRecord}>No Records Present</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Note;
