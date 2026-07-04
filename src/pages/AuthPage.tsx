import { useState } from 'react';
import type { TestUser } from '../auth/auth';
import { loginUser, registerUser } from '../auth/auth';

interface AuthPageProps {
  onAuthenticated: (user: TestUser) => void;
}

type Mode = 'login' | 'register';

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = mode === 'login'
      ? loginUser({ email, password })
      : registerUser({ name, email, password, repeatPassword });

    setErrors(result.errors);
    if (result.user) onAuthenticated(result.user);
  }

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="auth-hero">
          <span>BgApiary 1.0 RC-UserTest</span>
          <h1>{mode === 'login' ? 'Zaloguj się' : 'Załóż konto testowe'}</h1>
          <p>Lokalne konta testowe. Bez chmury, bez serwera, bez udawania, że localStorage jest Fort Knox.</p>
        </div>

        <div className="auth-switch">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setErrors([]); }}>Logowanie</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setErrors([]); }}>Rejestracja</button>
        </div>

        <form className="form-card auth-form" onSubmit={submit}>
          {mode === 'register' && (
            <label>
              Imię
              <input value={name} onChange={event => setName(event.target.value)} placeholder="np. Paweł" />
            </label>
          )}

          <label>
            Email
            <input value={email} onChange={event => setEmail(event.target.value)} placeholder="email@test.pl" autoComplete="email" />
          </label>

          <label>
            Hasło
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="minimum 4 znaki" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          </label>

          {mode === 'register' && (
            <label>
              Powtórz hasło
              <input type="password" value={repeatPassword} onChange={event => setRepeatPassword(event.target.value)} placeholder="powtórz hasło" autoComplete="new-password" />
            </label>
          )}

          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map(error => <p key={error}>{error}</p>)}
            </div>
          )}

          <button className="primary full" type="submit">
            {mode === 'login' ? 'Zaloguj' : 'Utwórz konto testowe'}
          </button>
        </form>

        <div className="auth-note">
          <strong>Ważne:</strong> to logowanie działa tylko lokalnie w tej przeglądarce. Do produkcji potrzebna będzie prawdziwa chmura i backend w 1.1+.
        </div>
      </section>
    </main>
  );
}
