import { FormEvent, useState } from 'react';
import { Modal } from '@shared/ui';
import ProjectForm, { FormInitialValueType } from './ProjectForm/ProjectForm';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../../mutations/projectMutations';
import { ProjectInterface } from '@shared/types';
import { GET_PROJECTS } from '../../../queries/projects';

/* eslint-disable-next-line */
export interface ImportProjectProps {}

export function ImportProject(props: ImportProjectProps) {
  const [addProject] = useMutation(ADD_PROJECT);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    variables: FormInitialValueType
  ) => {
    e.preventDefault();
    if (
      !variables.name ||
      !variables.status ||
      !variables.description ||
      !variables.clientId
    ) {
      return;
    }
    await addProject({
      variables,
      update(cache, { data: { addProject } }) {
        const data = cache.readQuery<{ projects: ProjectInterface[] | null }>({
          query: GET_PROJECTS,
        });
        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: data?.projects?.concat([addProject]) },
        });
      },
    }).then(() => {
      handleClose();
    });
  };

  return (
    <>
      <button onClick={handleOpen}>+ project</button>
      <Modal title="Project" open={open} handleClose={handleClose}>
        <ProjectForm handleClose={handleClose} handleSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default ImportProject;
