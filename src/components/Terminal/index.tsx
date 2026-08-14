import type {ReactNode} from 'react';

import styles from './styles.module.css';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Terminal({
  title = 'Terminal',
  children,
}: Props): ReactNode {
  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
