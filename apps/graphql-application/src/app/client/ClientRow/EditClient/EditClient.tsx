import { Modal } from '@shared/ui';
import ClientForm, {
  FormInitialValueType,
} from '../../../ClientForm/ClientForm';
import { GET_CLIENTS } from '../../../../queries/clients';
import { ClientInterface } from '@shared/types';
import { useMutation } from '@apollo/client';
import { EDIT_CLIENT } from '../../../../mutations/clientMutations';
import { FormEvent } from 'react';

/* eslint-disable-next-line */
export interface EditClientProps {
  initialClient: ClientInterface;
  handleClose: () => void;
  open: boolean;
}

export function EditClient(props: EditClientProps) {
  const [updateClient] = useMutation(EDIT_CLIENT);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    variables: FormInitialValueType
  ) => {
    e.preventDefault();
    const payload = Object.entries(variables).reduce((acc, curr) => {
      return {
        ...acc,
        ...(curr[1] && { [curr[0]]: curr[1] }),
      };
    }, {});
    await updateClient({
      variables: payload,
      update(cache, { data: { updateClient } }) {
        const data = cache.readQuery<{ clients: ClientInterface[] } | null>({
          query: GET_CLIENTS,
        });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: data?.clients.map((item) => {
              if (item.id === updateClient.id) return updateClient;
              return item;
            }),
          },
        });
      },
    }).then(() => {
      props.handleClose();
    });
  };

  return (
    <Modal
      title="Edit Client"
      open={props.open}
      handleClose={props.handleClose}
    >
      <ClientForm
        handleClose={props.handleClose}
        handleSubmit={handleSubmit}
        initialValues={props.initialClient}
      />
    </Modal>
  );
}

export default EditClient;
