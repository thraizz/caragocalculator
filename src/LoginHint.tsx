import { useAuth } from "./useAuth";

export const LoginHint = () => {
  const { characterName } = useAuth();
  if (characterName) return null;

  return (
    <p>
      Please log in to use the cargo calculator. <br />
      We need this to use EVE's <code>search</code> API to calculate the volume
      of the items in your market order.
    </p>
  );
};
