import React, { useEffect, useState } from "react";
import "./App.scss";

import NoteContainer from "../NoteContainer/NoteContainer";
import Sidebar from "../Sidebar/Sidebar";
import { INote } from "../../interfaces/interfaces";
import Tags from "../Tags/Tags";

function App() {
	const [notes, setNotes] = useState<INote[] | []>(
		JSON.parse(localStorage.getItem("notes") as string) || []
	);
	const [tags, setTags] = useState<Array<string>>(
		JSON.parse(localStorage.getItem("tags") as string) || []
	);
	const [filteredNotes, setFilteredNotes] = useState<INote[] | []>([]);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
		localStorage.setItem("tags", JSON.stringify(tags));
	}, [notes, tags]);

	const addNote = (color: string) => {
		setNotes([
			...notes,
			{
				text: "",
				data: new Date().toDateString(),
				color,
				id:
					new Date().toISOString() +
					Math.floor(Math.random() * 64).toString(),
				isEdit: false,
			},
		]);
	};

	const deleteNote = (id: string) => {
		setNotes([...notes].filter(note => note.id !== id));
		if (filterNotes.length) {
			setFilteredNotes([...filteredNotes].filter(note => note.id !== id));
		}
	};

	const editChange = (id: string, text: string) => {
		const newtags = [...tags] as Array<string>;
		const tempNotes = [...notes].reduce(
			(acc: INote[] | [], note: INote) => {
				note.text.split(" ").forEach((word: string) => {
					if (word[0] === "#") {
						if (!tags?.includes(word) && word !== "#")
							newtags.push(word);
					}
				});
				if (note.id === id) {
					text = text
						.split(" ")
						.map(word => {
							if (word[0] === "#") {
								return word.replace(/[#\s]/gi, " ");
							} else {
								return word;
							}
						})
						.join(" ");
					note.text = text.replace(/[#\s]/gi, " ");
					note.isEdit = !note.isEdit;
				}
				return [...acc, note];
			},
			[]
		);

		setNotes(tempNotes);
		setTags(newtags);
	};

	const deleteTag = (tagName: string) => {
		setTags(tags.filter(tag => tag !== tagName));
	};

	const changeValue = (id: string, e: string) => {
		const tempNotes = [...notes].reduce(
			(acc: INote[] | [], note: INote) => {
				if (note.id === id) {
					note.text = e;
				}
				return [...acc, note];
			},
			[]
		);
		setNotes(tempNotes);
	};

	const filterNotes = (tagName: string) => {
		const newNote = [...notes].filter(note =>
			note.text.includes(tagName.replace(/[#\s]/gi, " "))
		);
		setFilteredNotes(newNote);
	};

	const clearFilter = () => {
		setFilteredNotes([]);
	};

	return (
		<>
			<div className="App">
				<Sidebar addNote={addNote} />
				<NoteContainer
					notes={filteredNotes.length ? filteredNotes : notes}
					tags={tags}
					deleteNote={deleteNote}
					editChange={editChange}
					changeValue={changeValue}
				/>
				<Tags
					filterNotes={filterNotes}
					tags={tags}
					deleteTag={deleteTag}
					clearFilter={clearFilter}
				/>
			</div>
		</>
	);
}

export default App;
