import styles from './client.module.css';
import { useQuery } from '@apollo/client';
import { ClientInterface } from '@shared/types';
import ClientRow from './ClientRow/clientRow';
import { GET_CLIENTS } from '../../queries/clients';

export function Client() {
  const { loading, error, data } = useQuery<{ clients: ClientInterface[] }>(
    GET_CLIENTS
  );
  return (
    <div>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
      <ul>
        {!loading &&
          !error &&
          data &&
          data?.clients?.map((client: ClientInterface) => (
            <ClientRow client={client} />
          ))}
      </ul>
    </div>
  );
}

export default Client;
