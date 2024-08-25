import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AuthType = {
  accessToken: string | null;
  characterId: string | null;
  characterName: string | null;
  login: () => void;
  logout: () => void;
};

// Create a context
export const AuthContext = createContext<AuthType>({
  accessToken: null,
  characterId: null,
  characterName: null,
  login: () => {},
  logout: () => {},
});

// Function to generate a random state parameter
const generateState = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// EVE Online OAuth Config
const CLIENT_ID = "e16177c8687048608d1795a9d9fb96d9";
const REDIRECT_URI = `${window.location.origin}/callback`;
const SCOPE = "esi-search.search_structures.v1";
const RESPONSE_TYPE = "token";
const EVE_AUTH_URL = `https://login.eveonline.com/v2/oauth/authorize`;

export const AuthProvider = ({ children }: PropsWithChildren) => {
  console.log("Rendering auth.");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [characterId, setCharacterId] = useState(null);
  const [characterName, setCharacterName] = useState(null);

  const isRedirecting = useRef(false);

  useEffect(() => {
    if (isRedirecting.current) return;
    isRedirecting.current = true;
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const state = params.get("state");
      const storedState = sessionStorage.getItem("oauth_state");

      if (token && state === storedState) {
        setAccessToken(token);
        fetchCharacterInfo(token);
        sessionStorage.removeItem("oauth_state"); // Clear state after validation
      } else if (state !== storedState) {
        console.error("State mismatch. Potential CSRF attack.");
      }
    }
  }, []);

  const fetchCharacterInfo = async (token: string) => {
    try {
      const response = await fetch("https://esi.evetech.net/verify/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCharacterId(data.CharacterID);
      setCharacterName(data.CharacterName);
    } catch (error) {
      console.error("Error fetching character info:", error);
    }
  };

  const login = () => {
    const state = generateState();
    sessionStorage.setItem("oauth_state", state);

    const authUrl = `${EVE_AUTH_URL}?response_type=${RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPE
    )}&state=${state}`;
    window.location.href = authUrl;
  };

  const logout = () => {
    setAccessToken(null);
    setCharacterId(null);
    setCharacterName(null);
    window.location.hash = "";
    sessionStorage.removeItem("oauth_state");
  };

  const memoizedValue = useMemo(
    () => ({
      accessToken,
      characterId,
      characterName,
      login,
      logout,
    }),
    [accessToken, characterId, characterName]
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
