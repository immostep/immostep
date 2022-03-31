import { useState } from 'react';
import NavBar from './NavBar';
import PopupLoginForm from './PopupLoginForm';

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <header>
      <NavBar onClickConnection={() => setShowLoginForm(true)} />
      {showLoginForm ? <PopupLoginForm onClickCloseButton={() => setShowLoginForm(false)} /> : ''}
    </header>
  );
};

export default Header;
