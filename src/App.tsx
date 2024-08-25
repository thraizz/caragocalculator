import { PropsWithChildren } from "react";
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
        <TopBar>
          <LoginButton />
          <LogoutButton />
        </TopBar>
        <h1>EVE Online Cargo Calculator</h1>
        <LoginHint />
        <CargoCalculator />
      </div>
    </AuthProvider>
  );
}


const TopBar = ({ children }: PropsWithChildren) => {
  return <div className="top-bar">{children}</div>;
}