import scss from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer className={scss.Footer}>
			<div className="container">
				<div className={scss.content}>
					<h1>This is my YouTube app</h1>
					<h2>I hope you like it</h2>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
