import { Header } from '../../components';
import { useContext } from 'react';
import { UserAuth } from '../../context/UserAuth/UserAuth';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";



// STYLED COMPONENTS
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
  max-width: 1340px;
`;

const Title = styled.h1`
  grid-column: 2 / span 10;
  text-align: center;
  padding: 40px;
`;

const SignInForm = styled.form`
  grid-column: 4 / span 6;
  text-align: left;
  padding: 0 40px;
`;

const Label = styled.label`
	font-size: 0.8em;
	text-transform: uppercase;
	color: #aaa;
	text-align: left;
	margin: 4px 0;
	display: block;
`;

const Input = styled.input`
	width: 100%;
	min-height: 40px;
	border-radius: 4px;
	padding: 0 16px;
	box-sizing: border-box;
	font-size: 1em;
	margin-bottom: 16px;
`;

const Submit = styled.input`
	min-width: 100%;
	height: 40px;
	margin: 24px 0 24px;
	border-radius: 32px;
	border: none;
	font-weight: 700;
	background-color: #fade4b;
	color: black;
	text-transform: uppercase;
	&:hover { cursor: pointer; background-color: #f9d41a; }
`

const LogOut = styled.input`
	min-width: 100%;
	height: 40px;
	border-radius: 32px;
	border: 1px solid #ccc;
	font-weight: 700;
	color: #ccc;
	background-color: transparent;
	text-transform: uppercase;
	&:hover { cursor: pointer; color: white; }
`



// SIGNIN COMPONENT
function LogIn() {

  const { authData, setAuthData } = useContext(UserAuth);
  const navigate = useNavigate();
  
	function handleSubmit(event) {
		event.preventDefault();
    if (authData.email === event.target[0].value
    && authData.password === event.target[1].value) {
      console.log("Form data matches with localstore data. User is logged in.");
      setAuthData((prevAuthData) => ({
        ...prevAuthData,
        'isAuthenticated' : true
      }));
      window.localStorage.setItem('isAuthenticated', true);
      navigate(process.env.PUBLIC_URL + '/feed');
    } else {
      console.error("Form data doesn't match with localstore data. User is not logged in.");
    }
	}

	function logOut(event) {
		event.preventDefault();
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      'isAuthenticated' : false
    }));
    window.localStorage.setItem('isAuthenticated', false);
		console.log("User is logged out.");
	}

	return (
		<>
      <Header />
      <Main>
        <Title>Log In</Title>
				<SignInForm onSubmit={handleSubmit}>
					<div>
						<Label htmlFor="form-email">EMAIL</Label>
					</div>
					<div>
						<Input type="text" id="form-email" name="email"></Input>
					</div>
					<div>
						<Label htmlFor="form-password">PASSWORD</Label>
					</div>
					<div>
						<Input type="password" id="form-password" name="password"></Input>
					</div>
					<Submit type="submit" value="Log In"></Submit>
					<LogOut type="submit" value="Log Out" onClick={logOut}></LogOut>
				</SignInForm>
			</Main>
		</>
	);
}

export default LogIn;