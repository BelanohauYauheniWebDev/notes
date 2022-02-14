import s from "./Tags.module.scss";

export interface ITags {
	tags: Array<string>;
	deleteTag: (tagName: string) => void;
	filterNotes: (tagName: string) => void;
	clearFilter: () => void;
}

function Tags({ tags, deleteTag, filterNotes, clearFilter }: ITags) {
	return (
		<div className={s.tags}>
			<ul className={s.tags__list}>
				{tags?.map(tag => (
					<li
						className={s.item__group}
						key={tag + Math.floor(Math.random() * 100)}
					>
						<span
							className={s.item}
							onClick={() => filterNotes(tag)}
						>
							{tag}
						</span>
						<span
							onClick={() => deleteTag(tag)}
							className={s.delete}
						>
							&times;
						</span>
					</li>
				))}
			</ul>
			<button onClick={clearFilter} className={s.reset}>
				Clear Filter
			</button>
		</div>
	);
}

export default Tags;
