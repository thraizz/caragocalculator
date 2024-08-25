import './App.css';
import { AuthProvider } from './AuthContext.tsx';
import { CargoCalculator } from './CargoCalculator.tsx';
import LoginButton from './LoginButton.tsx';
import LogoutButton from './LogoutButton.tsx';

function App() {
  return (
    <AuthProvider>

    <div>
      <h1> Cargo Calculator</h1>
      <LoginButton />
      <LogoutButton />
      <CargoCalculator />
    </div>
    </AuthProvider>
  );
}

export default App;
