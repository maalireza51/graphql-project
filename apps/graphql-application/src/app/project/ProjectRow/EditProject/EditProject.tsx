import { Modal } from '@shared/ui';
import ProjectForm, {
  FormInitialValueType,
} from '../../../ImportSection/ImportProject/ProjectForm/ProjectForm';
import { GET_PROJECTS } from '../../../../queries/projects';
import { ProjectInterface } from '@shared/types';
import { useMutation } from '@apollo/client';
import { EDIT_PROJECT } from '../../../../mutations/projectMutations';
import { FormEvent } from 'react';

/* eslint-disable-next-line */
export interface EditProjectProps {
  initialProject: ProjectInterface;
  handleClose: () => void;
  open: boolean;
}

export function EditProject(props: EditProjectProps) {
  const [updateProject] = useMutation(EDIT_PROJECT);

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
    await updateProject({
      variables: payload,
      update(cache, { data: { updateProject } }) {
        const data = cache.readQuery<{ projects: ProjectInterface[] } | null>({
          query: GET_PROJECTS,
        });
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: data?.projects.map((item) => {
              if (item.id === updateProject.id) return updateProject;
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
      title="Edit Project"
      open={props.open}
      handleClose={props.handleClose}
    >
      <ProjectForm
        handleClose={props.handleClose}
        handleSubmit={handleSubmit}
        initialValues={props.initialProject}
      />
    </Modal>
  );
}

export default EditProject;
