import { Input } from '@shared/ui';
import styles from './ClientForm.module.css';
import { AiFillPhone, AiOutlineUser, AiTwotoneMail } from 'react-icons/ai';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ClientInterface } from '@shared/types';

export interface FormInitialValueType {
  id: string | number;
  name: string;
  email: string;
  phone: string;
}

/* eslint-disable-next-line */
export interface ClientFormProps {
  handleClose: () => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    variables: FormInitialValueType
  ) => void;
  initialValues?: ClientInterface;
}

export function ClientForm(props: ClientFormProps) {
  const [form, setForm] = useState<ClientInterface>({
    id: props.initialValues?.id || '',
    name: props.initialValues?.name || '',
    email: props.initialValues?.email || '',
    phone: props.initialValues?.phone || '',
  });
  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      <Input
        id="name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputOnChange}
        label="name"
        icon={<AiOutlineUser />}
      />
      <Input
        id="email"
        type="text"
        name="email"
        value={form.email}
        onChange={handleInputOnChange}
        label="email"
        icon={<AiTwotoneMail />}
      />
      <Input
        id="phone"
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleInputOnChange}
        label="phone"
        icon={<AiFillPhone />}
      />
      <div className={styles['form-btn']}>
        <button type="submit">submit</button>
        <button type="button" onClick={props.handleClose}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
