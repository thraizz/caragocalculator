import { useAuth } from "./useAuth";

export const LogoutButton = () => {
  const { logout, characterName } = useAuth();
  if (!characterName) return null;

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <p>Logged in as {characterName}</p>
      <button onClick={logout}>Logout</button>
    </div >
  );
};
