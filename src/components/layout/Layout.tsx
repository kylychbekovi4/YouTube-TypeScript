import YouTube from "../pages/YouTube";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import scss from "./Layout.module.scss";

const Layout = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<YouTube />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
