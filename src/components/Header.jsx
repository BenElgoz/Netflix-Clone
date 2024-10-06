import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/">Accueil</Link>
      <Link to="/favorites">Ma Liste</Link> 
    </header>
  );
}

export default Header;
