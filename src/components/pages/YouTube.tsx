import { useEffect, useState } from "react";
import {
	deleteCards,
	getTodo,
	patchYouTube,
	postTouTube,
} from "../../redux/tools/youTubeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Modal from "./Modal";
import scss from "./YouTube.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Item } from "../../types/index";

const YouTube: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	const [img, setImg] = useState("");
	const [link, setLink] = useState("");
	const [singer, setSinger] = useState("");

	// ! Состояние Редактировать
	const [editingId, setEditingId] = useState<number>(0);
	const [editTitle, setEditingTitle] = useState("");
	const [editImg, setEditingImg] = useState("");
	const [editLink, setEditingLink] = useState("");
	const [editSinger, setEditingSinger] = useState("");

	const startEdit = (item: Item) => {
		setEditingId(item._id!);
		setEditingTitle(item.title);
		setEditingImg(item.img);
		setEditingLink(item.video);
		setEditingSinger(item.singer);
	};

	const saveEdit = () => {
		if (editingId !== null && editTitle && editImg && editLink && editSinger) {
			dispatch(
				patchYouTube({
					_id: editingId!,
					updates: {
						title: editTitle,
						img: editImg,
						video: editLink,
						singer: editSinger,
					},
				})
			);
			setEditingId(0);
			setEditingTitle("");
			setEditingImg("");
			setEditingLink("");
			setEditingSinger("");
		}
	};

	const [selectedTouTube, setSelectedYouTube] = useState("");
	const dispatch = useAppDispatch();
	const [modal, setModal] = useState(false);

	const { data, filterYT } = useAppSelector((state) => state.youTubeReducer);

	// ! Open Modal
	const openModal = (video: string) => {
		setSelectedYouTube(video);
		setModal(true);
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	// ! Close Modal
	const closeModal = () => {
		setSelectedYouTube("");
		setModal(false);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// ! Handle Add
	const handleAdd = () => {
		if (title === "" || img === "" || link === "" || singer === "") {
			alert("Fill in all the fields!");
		} else {
			const newTodo = {
				title: title,
				img: img,
				video: link,
				filterYT: singer,
			};
			dispatch(postTouTube(newTodo));
			handleCloseModal();
		}
		setTitle("");
		setImg("");
		setLink("");
		setSinger("");
	};

	useEffect(() => {
		dispatch(getTodo());
	}, [dispatch]);

	// ! Delete
	const deleteTodo = (_id: number) => {
		dispatch(deleteCards(_id));
	};

	// ! Function Option Select
	const filteredVideos =
		filterYT === "All singers"
			? data
			: data.filter((item) => item.filterYT === filterYT);

	// ! HTML
	return (
		<div className={scss.YouTube}>
			<div className="container">
				<div className={scss.upload_button}>
					<Button variant="contained" onClick={handleOpenModal}>
						Upload new music
					</Button>
				</div>
				<div className={scss.content}>
					<div>
						<div className={scss.Modal_inputs}>
							{isModalOpen && (
								<Modal modal={isModalOpen}>
									<div className={scss.three_input}>
										<TextField
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											label="Name of music"
											color="secondary"
											focused
										/>
										<TextField
											value={img}
											onChange={(e) => setImg(e.target.value)}
											label="Cover photo"
											color="secondary"
											focused
										/>
										<TextField
											value={link}
											onChange={(e) => setLink(e.target.value)}
											label="Video link"
											color="secondary"
											focused
										/>
										<TextField
											value={singer}
											onChange={(e) => setSinger(e.target.value)}
											label="Singer name"
											color="secondary"
											focused
										/>
									</div>
									<div className={scss.buttons}>
										<Button variant="contained" onClick={handleAdd}>
											Ready
										</Button>
										<Button onClick={handleCloseModal}>Close</Button>
									</div>
								</Modal>
							)}
						</div>
					</div>
					<div className={scss.photos}>
						{/* //! Map */}
						{filteredVideos.map((item) => (
							<div className={scss.cards} key={item._id}>
								{editingId === item._id ? (
									<>
										<div className={scss.modal_three_inputs}>
											<TextField
												value={editTitle}
												onChange={(e) => setEditingTitle(e.target.value)}
												label="Name of music"
												color="secondary"
												focused
											/>
											<TextField
												value={editImg}
												onChange={(e) => setEditingImg(e.target.value)}
												label="Cover photo"
												color="secondary"
												focused
											/>
											<TextField
												value={editLink}
												onChange={(e) => setEditingLink(e.target.value)}
												label="Video link"
												color="secondary"
												focused
											/>

											<TextField
												value={editSinger}
												onChange={(e) => setEditingSinger(e.target.value)}
												label="Singer name"
												color="secondary"
												focused
											/>
										</div>
										<div className={scss.Modal_btn}>
											<Button variant="contained" onClick={saveEdit}>
												Save
											</Button>
											<Button
												variant="contained"
												onClick={() => setEditingId(0)}>
												Cancel
											</Button>
										</div>
									</>
								) : (
									<>
										<h2> {item.subject} </h2>
										<h3>Music: {item.title}</h3>

										<img
											onClick={() => openModal(item.video)}
											src={item.img}
											alt={item.title}
										/>
										<div className={scss.Delete_Edit_btn}>
											<Button
												variant="contained"
												onClick={() => deleteTodo(item._id!)}>
												Delete
											</Button>
											<Button
												variant="contained"
												onClick={() => startEdit(item)}>
												Edit
											</Button>
										</div>
									</>
								)}
							</div>
						))}
						<div onClick={closeModal}>
							<Modal modal={modal}>
								{selectedTouTube && <iframe src={selectedTouTube}></iframe>}
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YouTube;
