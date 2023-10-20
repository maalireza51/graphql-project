import { ProjectInterface } from '@shared/types';
import styles from './projectRow.module.css';
import { FaTrash } from 'react-icons/fa';
import { MouseEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../../../mutations/projectMutations';
import { GET_PROJECTS } from '../../../queries/projects';
import EditProject from './EditProject/EditProject';

/* eslint-disable-next-line */
export interface ProjectRowProps {
  project: ProjectInterface;
  head?: boolean;
}

export function ProjectRow({ project, head }: ProjectRowProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleDelete = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const isSure = window.confirm('do you want delete this row permanently?');
    if (isSure) {
      await deleteProject({
        variables: {
          id: project.id,
        },
        update(cache, { data: { deleteProject } }) {
          const data = cache.readQuery<{ projects: ProjectInterface[] | null }>(
            { query: GET_PROJECTS }
          );
          cache.writeQuery({
            query: GET_PROJECTS,
            data: {
              projects: data?.projects?.filter(
                (project: ProjectInterface) => project.id !== deleteProject.id
              ),
            },
          });
        },
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <li className={styles['project']} onClick={handleOpen}>
        <p>{project.id}</p>
        <p>{project.name}</p>
        <p>{project.description}</p>
        <p>{project.status}</p>
        <p>{project?.client?.name}</p>
        <p>
          {!head && (
            <span onClick={handleDelete} className={styles['delete-btn']}>
              <FaTrash />
            </span>
          )}
        </p>
      </li>
      <EditProject
        open={open}
        handleClose={handleClose}
        initialProject={project}
      />
    </>
  );
}

export default ProjectRow;
