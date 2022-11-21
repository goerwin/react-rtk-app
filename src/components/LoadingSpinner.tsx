import styles from './LoadingSpinner.module.scss';

export interface Props {
  show: boolean;
}
export default function LoadingSpinner({ show }: Props) {
  if (!show) return null;

  return (
    <div className={styles.container} data-testid="global-loading" role="alert" aria-busy="true">
      <div className={styles.spinner} />
    </div>
  );
}
