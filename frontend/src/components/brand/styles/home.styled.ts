import styled from 'styled-components';

export const TopWrapper = styled.div``;

export const TextAreaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;

  @media only screen and (min-width: 525px) {
    flex-direction: row;
    gap: none;
  }
`;

export const SubHeading = styled.div`
  margin-top: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #005f73;
`;
export const SuggestionBoxPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  @media only screen and (min-width: 426px) {
    margin-left: 20px;
  }

  @media only screen and (min-width: 992px) {
    margin-left: 45px;
  }

  &.insertMargin {
    margin: 0px;

    @media only screen and (min-width: 526px) {
      margin-top: 40px;
    }
  }

  &.congusted {
    margin-left: 0px;
  }
`;

export const TopBordered = styled.div`
  border: 1px solid #9fd0bd;
  border-radius: 12px;
  padding: 0 15px;
  margin-bottom: 30px;
`;
