import styled from "styled-components";

const LoaderContainer = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
`;

const LoadingWheel = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid #ccc;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;

// Keyframes CSS in base.css file
// @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

function Loader () {
  return (
    <LoaderContainer>
      <LoadingWheel />
    </LoaderContainer>
  );
}

export default Loader;