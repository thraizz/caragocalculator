import "./App.css";
import { AuthProvider } from "./AuthContext.tsx";
import { CargoCalculator } from "./CargoCalculator.tsx";
import { LoginButton } from "./LoginButton.tsx";
import { LoginHint } from "./LoginHint.tsx";
import { LogoutButton } from "./LogoutButton.tsx";

export const App = () => {
  return (
    <AuthProvider>
      <div>
        <div className="top-bar">
          <LoginButton />
          <LogoutButton />
        </div>
        <h1>EVE Online Cargo Calculator</h1>
        <LoginHint />
        <CargoCalculator />
      </div>
    </AuthProvider>
  );
}
