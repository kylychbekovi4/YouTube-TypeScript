import { ReactNode, FC } from "react";
import scss from "./Modal.module.scss";

interface ModalProps {
	modal: boolean;
	closeModal?: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ modal, closeModal, children }) => {
	if (!modal) {
		return null;
	}

	return (
		<>
			<div onClick={closeModal} className={scss.modalka}>
				<div className={scss.children}>{children}</div>
			</div>
		</>
	);
};

export default Modal;
