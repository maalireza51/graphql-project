import { ProjectInterface } from '@shared/types';
import styles from './project.module.css';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/projects';
import ProjectRow from './ProjectRow/projectRow';

const tableHead = {
  id: 'ID',
  name: 'NAME',
  description: 'DESCRIPTION',
  status: 'STATUS',
  client: { name: 'CLIENT' } as never,
};

export function Project() {
  const { loading, error, data } = useQuery<{ projects: ProjectInterface[] }>(
    GET_PROJECTS
  );
  return (
    <div>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
      <ul className={styles['projects-list']}>
        <ProjectRow project={tableHead} head />
        {!loading &&
          !error &&
          data &&
          data?.projects?.map((project: ProjectInterface) => (
            <ProjectRow key={project.id} project={project} />
          ))}
      </ul>
    </div>
  );
}

export default Project;
