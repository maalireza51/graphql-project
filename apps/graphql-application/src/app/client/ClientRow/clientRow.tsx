import { useMutation } from '@apollo/client';
import styles from './clientRow.module.css';
import { ClientInterface, ProjectInterface } from '@shared/types';
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { FaTrash } from 'react-icons/fa';
import { GET_CLIENTS } from '../../../queries/clients';
import { MouseEvent, useState } from 'react';
import EditClient from './EditClient/EditClient';
import { GET_PROJECTS } from '../../../queries/projects';

/* eslint-disable-next-line */
export interface ClientRowProps {
  client: ClientInterface;
  head?: boolean;
}

export function ClientRow({ client, head }: ClientRowProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const isSure = window.confirm('do you want delete this row permanently?');
    if (isSure) {
      await deleteClient({
        variables: {
          id: client.id,
        },
        // refetchQueries: [{ query: GET_CLIENTS }],
        update(cache, { data: { deleteClient } }) {
          const data = cache.readQuery<{ clients: ClientInterface[] } | null>({
            query: GET_CLIENTS,
          });
          const projectsData = cache.readQuery<{
            projects: ProjectInterface[];
          } | null>({
            query: GET_PROJECTS,
          });
          cache.writeQuery({
            query: GET_CLIENTS,
            data: {
              clients: data?.clients?.filter(
                (client: ClientInterface) => client.id !== deleteClient.id
              ),
            },
          });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: {
              projects: projectsData?.projects.filter(
                (project: ProjectInterface) => project.client?.id !== client.id
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
      <li className={styles['client']} onClick={handleOpen}>
        <p>{client.id}</p>
        <p>{client.name}</p>
        <p>{client.email}</p>
        <p>{client.phone}</p>
        <p>
          {!head && (
            <span onClick={handleDelete} className={styles['delete-btn']}>
              <FaTrash />
            </span>
          )}
        </p>
      </li>
      <EditClient
        open={open}
        handleClose={handleClose}
        initialClient={client}
      />
    </>
  );
}

export default ClientRow;
