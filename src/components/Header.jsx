import styles from './Header.module.css';

export function Header({ brand, description, children }) {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.logo}>GT</span>
          <div>
            <strong>{brand}</strong>
            <span>{description}</span>
          </div>
        </div>

        <nav className={styles.navigation} aria-label='Navegação principal'>
          {children}
        </nav>
      </div>

      <div className={styles.content}>
        <h1>Seja Bem-vindo!</h1>
        <p>Esse vai ser a segunda aula de React, e estamos desenvolvendo aos poucos</p>
      </div>
    </header>
  );
}

