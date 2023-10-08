import { useMutation } from '@apollo/client';
import styles from './clientRow.module.css';
import { ClientInterface } from '@shared/types';
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { FaTrash } from 'react-icons/fa';
import { GET_CLIENTS } from '../../../queries/clients';

/* eslint-disable-next-line */
export interface ClientRowProps {
  client: ClientInterface;
}

export function ClientRow({ client }: ClientRowProps) {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async () => {
    await deleteClient({
      variables: {
        id: client.id,
      },
      // refetchQueries: [{ query: GET_CLIENTS }],
      update(cache, { data: { deleteClient } }) {
        const data = cache.readQuery<{ clients: ClientInterface[] } | null>({
          query: GET_CLIENTS,
        });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: data?.clients?.filter(
              (client: ClientInterface) => client.id !== deleteClient.id
            ),
          },
        });
      },
    });
  };

  return (
    <li className={styles.client}>
      <p>{client.id}</p>
      <p>{client.name}</p>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <span onClick={handleDelete}>
        <FaTrash />
      </span>
    </li>
  );
}

export default ClientRow;
