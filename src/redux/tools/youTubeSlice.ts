import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { NewTodo } from "../../types";

const url = import.meta.env.VITE_BACKGROUND_URL;

export interface Data {
	_id?: number;
	title: string;
	img: string;
	filterYT: string;
	subject: string;
	music: string;
	link: string;
	singer: string;
	video: string;
}

interface YouTubeState {
	data: Data[];
	loading: boolean;
	error: null | string;
	filterYT: string;
}
const initialState: YouTubeState = {
	data: [],
	loading: false,
	error: null,
	filterYT: "All singers",
};

interface EditYouTube {
	_id: number;
	updates: Partial<Data>;
}

// ! Post request
export const postTouTube = createAsyncThunk(
	"todo/postTouTube",
	async (newTodo: NewTodo) => {
		try {
			const response = await axios.post(url, newTodo);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
);

// ! Patch request
export const patchYouTube = createAsyncThunk(
	"todo/patchYouTube",
	async ({ _id, updates }: EditYouTube) => {
		try {
			const response = await axios.patch(`${url}/${_id}`, updates);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
);

// ! Get request
export const getYouTube = createAsyncThunk("todo/getYouTube", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

// ! Delete request
export const deleteCards = createAsyncThunk(
	"todo/deleteCards",
	async (_id: number) => {
		try {
			(await axios.delete(`${url}/${_id}`)).data;
			return _id;
		} catch (error) {
			console.error(error);
		}
	}
);

// ! Готовый бэкенд Get
export const getTodo = createAsyncThunk<Data[]>("todo/getTodo", async () => {
	const response = await axios.get<Data[]>(url);
	return response.data;
});

const youTubeSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		// !
		setFilter: (state, action: PayloadAction<string>) => {
			state.filterYT = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTodo.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTodo.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(getTodo.rejected, (state, action) => {
				state.error = action.error.message || null;
				state.loading = false;
			})

			// ! post
			.addCase(postTouTube.pending, (state) => {
				state.loading = true;
			})
			.addCase(postTouTube.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(postTouTube.rejected, (state, action) => {
				state.error = action.error.message || null;
				state.loading = false;
			})
			// ! delete
			.addCase(deleteCards.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCards.fulfilled, (state, action) => {
				state.loading = false;
				state.data = state.data.filter((item) => item._id !== action.payload);
			})
			.addCase(deleteCards.rejected, (state, action) => {
				state.error = action.error.message || null;
				state.loading = false;
			})
			// //!Patch
			.addCase(patchYouTube.fulfilled, (state, action) => {
				const index = state.data.findIndex(
					(item) => item._id === action.payload._id
				);
				if (index !== -1) {
					state.data[index] = action.payload;
				}
			});
	},
});

export const { setFilter } = youTubeSlice.actions;
export const youTubeReducer = youTubeSlice.reducer;
