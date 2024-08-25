import { useAuth } from './useAuth';

const LoginButton = () => {
  const { login, characterName } = useAuth();

  return (
    <div>
      {!characterName ? (
        <button onClick={login}>Login with EVE Online</button>
      ) : (
        <p>Welcome, {characterName}</p>
      )}
    </div>
  );
};

export default LoginButton;
