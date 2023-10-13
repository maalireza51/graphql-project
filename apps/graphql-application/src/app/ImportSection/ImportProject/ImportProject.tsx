import { useState } from 'react';
import styles from './ImportProject.module.css';
import { Modal } from '@shared/ui';

/* eslint-disable-next-line */
export interface ImportProjectProps {}

export function ImportProject(props: ImportProjectProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button onClick={handleOpen}>+ project</button>
      <Modal title="Project" open={open} handleClose={handleClose}>
        hh
      </Modal>
    </>
  );
}

export default ImportProject;
