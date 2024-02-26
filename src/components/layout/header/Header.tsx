import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/tools/youTubeSlice";
import scss from "./Header.module.scss";

const Header: React.FC = () => {
	const dispatch = useDispatch();

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilter(e.target.value));
	};

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.Logo}>
						<h1>YouTube</h1>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
							alt=""
						/>
					</div>
					<div>
						<h1>Music Page Only:</h1>
					</div>
					<div>
						<select className={scss.Options} onChange={handleFilterChange}>
							<option value="All singers">All singers</option>
							<option value="Ulukmanapo">Ulukmanapo</option>
							<option value="Bakr">Bakr</option>
							<option value="Mirbek Atabekov">Mirbek Atabekov</option>
							<option value="Aikhan">Aikhan</option>
							<option value="Begish">Begish</option>
						</select>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
