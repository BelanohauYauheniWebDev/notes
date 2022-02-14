import s from "./Note.module.scss";
import { INote } from "../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

interface INoter {
	note: INote;
	tags: Array<string>;
	deleteNote: (id: string) => void;
	editChange: (id: string, text: string) => void;
	changeValue: (id: string, e: string) => void;
}

function Note({ note, deleteNote, editChange, changeValue, tags }: INoter) {
	const { color, data, text, id, isEdit } = note;

	return (
		<div className={s.note} style={{ backgroundColor: `${color}` }}>
			{isEdit ? (
				<textarea
					value={text}
					onChange={e => {
						changeValue(id, e.target.value);
					}}
					className={s.note__textarea}
					placeholder={"Enter your note"}
				></textarea>
			) : (
				<div className={s.note__div}>{text}</div>
			)}

			<div className={s.note__footer}>
				<p className={s.data}>{data}</p>
				{!isEdit ? (
					<FontAwesomeIcon
						onClick={() => editChange(id, text)}
						size="1x"
						icon={faPen}
						className={s.pen}
					/>
				) : (
					<FontAwesomeIcon
						onClick={() => editChange(id, text)}
						size="1x"
						icon={faCheck}
						className={s.pen}
					/>
				)}

				<FontAwesomeIcon
					onClick={() => deleteNote(id)}
					size="1x"
					icon={faTrash}
					className={s.trash}
				/>
			</div>
		</div>
	);
}

export default Note;
