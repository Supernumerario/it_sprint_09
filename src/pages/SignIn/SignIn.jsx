import { Header } from '../../components';
import styled from "styled-components";
import { useContext } from 'react';
import { UserAuth } from '../../context/UserAuth/UserAuth';
import { useNavigate } from 'react-router-dom';



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

const Checkbox = styled.input`
	display: inline-block;
	min-height: 24px;
	width: 24px;
	der-radius: 4px;
	box-sizing: border-box;
	padding: 0;
	margin: 16px 16px 0 0;
	accent-color: #fade4b;
`;

const Submit = styled.input`
	min-width: 100%;
	height: 40px;
	margin: 24px 0 80px;
	border-radius: 32px;
	border: none;
	font-weight: 700;
	background-color: #fade4b;
	color: black;
	text-transform: uppercase;
	&:hover { cursor: pointer; background-color: #f9d41a; }
`



// SIGNIN COMPONENT
function SignIn() {

  const { authData, setAuthData } = useContext(UserAuth);
	const navigate = useNavigate();

	function handleInputChange(key, value) {
		try {
			setAuthData((prevAuthData) => ({
				...prevAuthData,
				[key]: value
			}));
			window.localStorage.setItem(key, value);
		} catch (error) {
			console.error(error);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log("Account created:");
		console.log(authData);
    navigate(process.env.PUBLIC_URL + '/login');
	}

	return (
		<>
      <Header />
      <Main>
        <Title>Create your account</Title>
				<SignInForm onSubmit={handleSubmit}>
					<div>
						<Label htmlFor="form-name">FIRST NAME</Label>
					</div>
					<div>
						<Input type="text" id="form-name" name="firstname" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></Input>
					</div>
					<div>
						<Label htmlFor="form-lastname">LAST NAME</Label>
					</div>
					<div>
						<Input type="text" id="form-lastname" name="lastname" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></Input>
					</div>
					<div>
						<Label htmlFor="form-email">EMAIL</Label>
					</div>
					<div>
						<Input type="text" id="form-email" name="email" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></Input>
					</div>
					<div>
						<Label htmlFor="form-password">PASSWORD</Label>
					</div>
					<div>
						<Input type="password" id="form-password" name="password" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></Input>
					</div>
					<div>
						<Checkbox type="checkbox" id="form-news" name="news" onChange={(e) => handleInputChange(e.target.name, e.target.checked)}></Checkbox>
						<label htmlFor="form-news">Yes! I'm in for the newsletter.</label>
					</div>
					<Submit type="submit" value="CREATE ACCOUNT"></Submit>
				</SignInForm>
			</Main>
		</>
	);
}

export default SignIn;