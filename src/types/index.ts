export interface Item {
	_id?: number;
	img: string;
	title: string;
	link: string;
	singer: string;
	video: string;
}

export interface NewTodo {
	title: string;
	img: string;
	video: string;
	filterYT: string;
}
