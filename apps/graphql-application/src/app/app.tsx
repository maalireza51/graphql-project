// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Link } from 'react-router-dom';
import { SiGraphql } from 'react-icons/si';
import Client from './client/client';
import ImportSection from './ImportSection/ImportSection';
import Project from './project/project';

export function App() {
  return (
    <div>
      <div role="navigation" className={styles['navigation']}>
        <div className={styles.logo}>
          <SiGraphql className={styles['logoImg']} />
          <h1>GraphQL Application</h1>
        </div>
        <ul>
          <Link to="/">
            <li>Clients</li>
          </Link>
          <Link to="/projects">
            <li>Projects </li>
          </Link>
        </ul>
        <ImportSection />
      </div>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
