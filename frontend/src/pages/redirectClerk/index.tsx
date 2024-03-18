import styled from 'styled-components/macro';

export const RedirectClerk = () => {
  return (
    <Wrapper>
      <h2>logging you in, please be patient...</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  z-index: 100;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 40px;
  }

  @media screen and (max-width: 991px) {
    h2 {
      font-size: 20px;
    }
  }
`;
