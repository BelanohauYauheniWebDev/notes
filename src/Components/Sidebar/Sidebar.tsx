import { useState } from "react";
import s from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface ISidebar {
	addNote: (color: string) => void;
}

function Sidebar({ addNote }: ISidebar) {
	const [isOpen, setIsOpen] = useState(false);
	const colors = ["#fe9b72", "#fec971", "#00d4fe", "#b693fd", "#e4ee91"];

	const classes =
		s.sidebar__list + `${isOpen ? " " + s.sidebar__list__active : ""}`;
	return (
		<div className={s.sidebar}>
			<FontAwesomeIcon
				onClick={() => setIsOpen(!isOpen)}
				size="3x"
				icon={faCirclePlus}
				className={s.add}
			/>
			<ul className={classes}>
				{colors.map((item, i) => (
					<li
						key={i + 1}
						style={{ backgroundColor: item }}
						className={s.sidebar__list__item}
						onClick={() => addNote(item)}
					/>
				))}
			</ul>
		</div>
	);
}

export default Sidebar;
