import ImportClient from './ImportClient/ImportClient';
import ImportProject from './ImportProject/ImportProject';
import styles from './ImportSection.module.css';

/* eslint-disable-next-line */
export interface ImportSectionProps {}

export function ImportSection(props: ImportSectionProps) {
  return (
    <div className={styles['add-btn']}>
      <ImportClient />
      <ImportProject />
    </div>
  );
}

export default ImportSection;
