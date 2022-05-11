import React from "react";

import styled from "styled-components";

export const MainPage = () => {
  return (
    <>
      <MainWrapper>
        <ContentWrapper>
          <h1>Fun with AI</h1>
          <p>Enter Prompt</p>
          <input type='text'></input>
          <div className='submit-div'>
            <button>Submit</button>
          </div>
          <h2>Responses</h2>
        </ContentWrapper>
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
`;
