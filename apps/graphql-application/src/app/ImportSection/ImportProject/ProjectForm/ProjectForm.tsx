import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import styles from './ProjectForm.module.css';
import { ClientInterface, ProjectInterface } from '@shared/types';
import { Input, Select } from '@shared/ui';
import { AiOutlineUser } from 'react-icons/ai';
import { MdDescription } from 'react-icons/md';
import { TbProgressCheck } from 'react-icons/tb';
import { PiUserListFill } from 'react-icons/pi';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../../../queries/clients';

export interface FormInitialValueType {
  id: string | number;
  name: string;
  status: string;
  description: string;
  clientId?: string | number;
}

interface ProjectFormProps {
  handleClose: () => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    variables: FormInitialValueType
  ) => void;
  initialValues?: ProjectInterface;
}

const ProjectForm = (props: ProjectFormProps) => {
  const { loading, error, data } = useQuery<{ clients: ClientInterface[] }>(
    GET_CLIENTS
  );

  const status = useMemo(() => {
    switch (props.initialValues?.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        return '';
    }
  }, [props.initialValues?.status]);

  const [form, setForm] = useState<ProjectInterface>({
    id: props.initialValues?.id || '',
    clientId: props.initialValues?.client?.id || '',
    name: props.initialValues?.name || '',
    status: status || '',
    description: props.initialValues?.description || '',
  });

  const handleInputOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form
      className={styles['form']}
      onSubmit={(e) => props.handleSubmit(e, form)}
    >
      {!loading && !error && data?.clients.length ? (
        <Select
          id="clientId"
          name="clientId"
          icon={<PiUserListFill />}
          value={form.clientId}
          label="client"
          onChange={handleInputOnChange}
          disabled={!!props.initialValues?.client?.id}
        >
          <option value={''}>Select Client</option>
          {data.clients.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      ) : (
        'please wait...'
      )}
      <Input
        id="name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputOnChange}
        label="name"
        icon={<AiOutlineUser />}
      />
      <Select
        id="status"
        name="status"
        icon={<TbProgressCheck />}
        value={form.status}
        label="status"
        onChange={handleInputOnChange}
      >
        <option value={''}>Select Status</option>
        <option value={'new'}>Not Started</option>
        <option value={'progress'}>In Progress</option>
        <option value={'completed'}>Completed</option>
      </Select>
      <Input
        id="description"
        type="text"
        name="description"
        value={form.description}
        onChange={handleInputOnChange}
        label="description"
        icon={<MdDescription />}
      />
      <div className={styles['form-btn']}>
        <button type="submit">submit</button>
        <button type="button" onClick={props.handleClose}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
