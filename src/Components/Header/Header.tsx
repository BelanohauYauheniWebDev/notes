import { useCallback, useEffect, useRef, useState } from "react";

export const Header = () => {
	const [noteValue, setNoteValue] = useState<string>("");
	const [notes, setNotes] = useState<any>([]);

	const handleChange = (e: string) => {
		setNoteValue(e);
	};

	const addNote = () => {
		if (noteValue.trim().length) {
			setNotes([
				...notes,
				{
					value: noteValue,
					id: new Date().toISOString(),
					done: false,
					isEdit: false,
				},
			]);
			setNoteValue("");
		}
	};

	const ref = useRef(null);
	const onEdit = (id: any) => {
		const newA = [...notes].reduce((acc, note) => {
			if (note.id === id) {
				note.isEdit = !note.isEdit;
			}
			acc.push(note);
			return acc;
		}, []);

		setNotes(newA);
	};

	const changeValue = (id: any, e: any) => {
		const newA = [...notes].reduce((acc, note) => {
			if (note.id === id) {
				note.value = e;
			}
			acc.push(note);
			return acc;
		}, []);
		setNotes(newA);
	};

	// useEffect(() => {
	// 	setNotes(notes);
	// }, [notes]);

	return (
		<div>
			<textarea
				onChange={e => handleChange(e.target.value)}
				value={noteValue}
			></textarea>
			<button onClick={addNote}>add note</button>

			<div>
				{notes.length
					? notes.map((note: any) => (
							<div style={{ display: "flex" }} key={note.id}>
								{note.isEdit ? (
									<textarea
										ref={ref}
										onChange={e =>
											changeValue(note.id, e.target.value)
										}
										value={note.value}
									></textarea>
								) : (
									<h2>{note.value}</h2>
								)}
								<button onClick={() => onEdit(note.id)}>
									edit
								</button>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
};
