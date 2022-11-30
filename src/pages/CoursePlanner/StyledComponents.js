import styled, {css} from "styled-components";

// Layout

export const StyledSandwichLayouts = styled.div`
  display: grid;
  padding-right: 15px;
  height: calc(100vh - 80px);
  //grid-template-rows: 70px 1fr 60px 1fr 1fr 1fr;
  grid-template-rows: auto 1fr 1fr 1fr 1fr;
  overflow: auto;
  //border: dashed black;
`

// 1.1 Header in Sandwich layout
export const StyledHeader = styled.div`
  margin-top: 15px;
`
export const Header = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  & div {
    font-family: 'Titillium Web', sans-serif;
    font-size: 1.3em;
  }
  //background: lightgray;
  //border: solid lightgray;
`;

export const StyledStudentInfoPad = styled.div`
  height: auto;
  text-align: center;
  box-shadow: 0 2px 4px 0 #c7ccd5;
  //border-radius: 3px;
  border-bottom: darkblue solid 3px;
  margin: 0 5% 10px 0;
`

export const StyledStudentInfoPadLast = styled.div`
  height: auto;
  text-align: center;
  box-shadow: 0 2px 4px 0 #c7ccd5;
  border-radius: 3px;
  border-bottom: darkblue solid 3px;
  margin: 0px 0 10px 0;
`

// 1.2 Body

export const StyledDeconstructedPancake = styled.div`
  display: grid;
  //grid-template-rows: calc(100vh - 200px);
  //border: dashed orange;
  //overflow: scroll;
`

export const StyledTable = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  //margin-top: 15px;
  //border: solid #c7ccd5;
  //box-shadow: 0 2px 4px 0 #c7ccd5;
  //margin-bottom: 20px;
`

export const StyledTableOfTable = styled.div`
  margin-bottom: 10px;
`

export const StyledTableOfButton = styled.div`
  padding-right: 10px;
  margin-bottom: 10px;
`

export const Visualize = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 300px;
  overflow: auto;
`

// 1.3 Button row
export const StyledButtonRow = styled.div`
  width: 100%;
  height: 100%;
  //border: dashed darkgoldenrod;
  padding: 6px 0 15px 0;
  
`

// 2. Other components
export const StyledSemesterPanel = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  height: 100%;
  width: 650px;
  border: lightgrey solid 1px;
`

export const StyledSemesterPanelTitle = styled.div`
  width: 500px;
  justify-content: center;
  align-content: center;
  text-align: center;
  line-height: 50px;
  font-size: 1em;
  //border: darkgrey solid 1px;
`

