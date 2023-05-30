
import { Header } from '../../components';
import styled from "styled-components";



// STYLED COMPONENTS
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
  max-width: 1340px;
`;

const Welcome = styled.h3`
  grid-column: 2 / span 10;
  text-align: center;
  padding: 0 40px;
`;



function Home () {

  return (
    <>
      <Header />
      <Main>
        <Welcome>Welcome to EMT Feed. Sign In or Log In to continue.</Welcome>
      </Main>
    </>
  );
}

export default Home;