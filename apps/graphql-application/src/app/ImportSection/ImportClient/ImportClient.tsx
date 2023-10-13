import { Modal } from '@shared/ui';
import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clients';
import { ClientInterface } from '@shared/types';
import ClientForm, { FormInitialValueType } from '../../ClientForm/ClientForm';

/* eslint-disable-next-line */
export interface ImportClientProps {}

export function ImportClient(props: ImportClientProps) {
  const [addClient] = useMutation(ADD_CLIENT);
  const [open, setOpen] = useState<boolean>(false);

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
    if (!variables.name || !variables.email || !variables.phone) {
      return;
    }
    await addClient({
      variables,
      update(cache, { data: { addClient } }) {
        const data = cache.readQuery<{ clients: ClientInterface[] } | null>({
          query: GET_CLIENTS,
        });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: data?.clients.concat([addClient]) },
        });
      },
    }).then(() => {
      handleClose();
    });
  };

  return (
    <>
      <button onClick={handleOpen}>+ client</button>
      <Modal title="Add Client" open={open} handleClose={handleClose}>
        <ClientForm handleClose={handleClose} handleSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default ImportClient;
