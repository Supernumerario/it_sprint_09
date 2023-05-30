import { Link } from '../../components';
import { useContext } from 'react';
import { UserAuth, SavedArticles } from '../../context';
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const HeaderContent = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
`;

const NavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LogOut = styled.button`
  border-radius: 32px;
  heigth: 40px;
  border: none;
  margin: 0 0 32px;
	text-transform: uppercase;
  padding: 8px 24px;
  cursor: pointer;
`;



function Header () {

  const { authData, setAuthData } = useContext(UserAuth);
  const { articles } = useContext(SavedArticles);

	function logOut() {
		try {
			setAuthData((prevAuthData) => ({
				...prevAuthData,
				'isAuthenticated' : false
			}));
			window.localStorage.setItem('isAuthenticated', false);
		} catch (error) {
			console.error(error);
		}
	}

  return (
    <HeaderContainer>
      <HeaderContent>

        <h1>El Mundo Today Feed</h1>
        {authData.isAuthenticated ? <div><p>Hello {authData.firstname}</p><LogOut onClick={logOut}>Log Out</LogOut></div> : null }

        <NavUl>
          {authData.isAuthenticated ? null : <li><Link to="/">Home</Link></li> }
          {authData.isAuthenticated ? null : <li><Link to="/signin">Sign In</Link></li> }
          {authData.isAuthenticated ? null : <li><Link to="/login">Log In</Link></li> }

          {authData.isAuthenticated ? <li><Link to="/feed">Feed</Link></li> : null }
          {authData.isAuthenticated ? <li><Link className={`${articles.list.length > 0 ? "saved-articles" : ""}`} to="/articles">Saved Articles ({articles.list.length})</Link></li> : null }
        </NavUl>

      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;