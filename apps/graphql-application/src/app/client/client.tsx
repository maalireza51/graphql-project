import styles from './client.module.css';
import { useQuery } from '@apollo/client';
import { ClientInterface } from '@shared/types';
import ClientRow from './ClientRow/clientRow';
import { GET_CLIENTS } from '../../queries/clients';

const tableHead: ClientInterface = {
  id: 'ID',
  email: 'EMAIL',
  name: 'NAME',
  phone: 'PHONE',
};

export function Client() {
  const { loading, error, data } = useQuery<{ clients: ClientInterface[] }>(
    GET_CLIENTS
  );
  return (
    <div>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
      <ul className={styles['clients-list']}>
        <ClientRow client={tableHead} head />
        {!loading &&
          !error &&
          data &&
          data?.clients?.map((client: ClientInterface) => (
            <ClientRow key={client.id} client={client} />
          ))}
      </ul>
    </div>
  );
}

export default Client;
