import { ReactNode } from 'react';
import styles from './Modal.module.css';
import { AiOutlineClose } from 'react-icons/ai';

/* eslint-disable-next-line */
export interface ModalProps {
  children: ReactNode;
  handleClose?: () => void;
  open: boolean;
  title: string;
}

export function Modal(props: ModalProps) {
  if (!props.open) return false;
  return (
    <>
      <div className={styles['modal-backdrop']} onClick={props.handleClose} />
      <div className={styles['modal']}>
        <div className={styles['modal-header']}>
          <h3>{props.title}</h3>
          {props.handleClose && (
            <AiOutlineClose
              onClick={props.handleClose}
              className={styles['modal-close-btn']}
            />
          )}
        </div>
        <div className={styles['modal-body']}>{props.children}</div>
      </div>
    </>
  );
}

export default Modal;
