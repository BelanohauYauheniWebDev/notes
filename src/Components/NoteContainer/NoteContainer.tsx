import { INote } from "../../interfaces/interfaces";
import Note from "../Note/Note";
import s from "./NoteContainer.module.scss";

interface INoteContainer {
	deleteNote: (id: string) => void;
	editChange: (id: string, text: string) => void;
	changeValue: (id: string, e: string) => void;
	notes: INote[] | [];
	tags: Array<string>;
}

function NoteContainer({
	notes,
	tags,
	deleteNote,
	editChange,
	changeValue,
}: INoteContainer) {
	const classes = s.note__container + " custom-scroll";

	const reverseArray = (arr: INote[]) => {
		const result = [];
		for (let i = arr.length - 1; i >= 0; --i) {
			result.push(arr[i]);
		}
		return result;
	};
	return (
		<div className={s.container}>
			<h2>Notes</h2>
			<div className={classes}>
				{notes?.length ? (
					reverseArray(notes).map(note => (
						<Note
							tags={tags}
							key={note.id}
							note={note}
							deleteNote={deleteNote}
							editChange={editChange}
							changeValue={changeValue}
						/>
					))
				) : (
					<h2>Not notes</h2>
				)}
			</div>
		</div>
	);
}

export default NoteContainer;
