import styled, {css} from "styled-components";


// Layout
export const StyledLayout = styled.div`
  display: grid;
  height: 400px;
  grid-template-columns: 30% auto;
  //overflow: auto;
  //border: dashed black;
`

export const StyledLeftContainer = styled.div`
  display: flex;
  padding: 5px;
  height: 100%;
  line-height: 100%;
  justify-content: center;
  align-items: center;
  //border: dashed orange;
`

export const StyledRightContainer = styled.div`
  display: grid;
  grid-template-rows: 30% auto auto auto 30%;
  padding: 5px;
  //border: dashed blue;
`

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 100%;
  //border: dashed black;
  
  & text {
    display: flex;
    justify-content: left;
    font-size: 2em;
  }
`

export  const StyledTwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 50% auto;
  //border: dashed green;
  
  & div {
    display: flex;
    justify-content: left;
    align-items: center;
  }
`