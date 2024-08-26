import { useAuth } from "./useAuth";

export const LoginButton = () => {
  const { login, characterName } = useAuth();
  if (characterName) return null;

  return (
    <button onClick={login} style={{
      padding: "0", border: "none"
    }}>
      <img src="/eve-sso-login-black-small.png" alt="Login with EVE Online" />
      <span style={{ display: "none" }}> Login with EVE Online</span>
    </button>
  );
};
