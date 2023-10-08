// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Link } from 'react-router-dom';
import { SiGraphql } from 'react-icons/si';
import Client from './client/client';

export function App() {
  return (
    <div>
      <div role="navigation" className={styles.navigation}>
        <div className={styles.logo}>
          <SiGraphql className={styles.logoImg} />
          <h1>GraphQL Application</h1>
        </div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/page-2">
            <li>Page 2 </li>
          </Link>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
