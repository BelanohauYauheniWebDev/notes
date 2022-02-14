export interface INote {
	text: string;
	data: any;
	color: string;
	id: string;
	isEdit: boolean;
}
export interface INotes {
	notes: INote[] | [] | any;
}
