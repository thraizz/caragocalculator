import { useAuth } from './useAuth';

const LogoutButton = () => {
  const { logout, characterName } = useAuth();

  return (
    <div>
      {characterName && (
        <>
          <p>Logged in as {characterName}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default LogoutButton;
