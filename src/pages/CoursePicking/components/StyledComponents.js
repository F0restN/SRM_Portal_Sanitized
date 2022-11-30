import styled, {css} from "styled-components";

// Layout

export const StyledSandwichLayouts = styled.div`
  display: grid;
  height: calc(100vh - 80px);
  grid-template-rows: 60px 1fr 60px;
  //border: dashed black;
`

// 1.1 Header in Sandwich layout
export const StyledTitle = styled.div`
  width: 100%;
  position: center;
  background: #ffffff;
  padding: 19px 30px 30px 30px;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  border-radius: 3px;
  line-height: 18px;
`
export const Header = styled.div`
  margin-left: 20px;
  padding-top: 1.1rem;
  font-size: 30px;
`;

export const StyledSubtitle = styled.div`
  margin: 5px 0 10px 0;
  //margin-left: 20px;
  font-size: 12px;
  color: grey;
`

// 1.2 Body

export const StyledDeconstructedPancake = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: calc(100vh - 200px);
  //border: dashed black;
`

// 1.3 Foot

export const StyledFoot = styled.div`
  width: 100%;
  padding: 0.1px;
  margin: 10px 0 0 0;
`

export const StyleButton = styled.div`
  float: right;
  margin: 5px;
`

// Styled Component container for Courses selection
// export const StyledLayoutContainer = styled.div`
//   flex: 1 1 150px;
//   margin: 10px 0px 10px 0px;
//   height: 1fr;
//   background: #ffffff;
//   box-shadow: 0 2px 4px 0 #e3e9f3;
//   border-radius: 3px;
//   line-height: 18px;
// `

export const StyledLayoutContainerL = styled.div`
  //flex: 1 1 150px;
  height: available;
  margin-right: 8px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  //border: dashed red;
  border-radius: 3px;
  line-height: 18px;
`

export const StyledLayoutContainerR = styled.div`
  //flex: 1 1 150px;
  height: available;
  margin-left: 8px;
  line-height: 18px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  //border: dashed red;
  border-radius: 3px;
`

// Header inside of the layout container
export const StyledContainerHeader = styled.div`
  width: 100%;
  height: auto;
  background: #e3e9f3;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  line-height: 50px;
  font-weight: bold;
`
// Means the inside container of left and right container
export const StyledContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
`

// export const StyledLayoutLeftContainer = styled.div`
//   flex: 1 1 150px;
//   margin: 10px 20px 10px 20px;
//   height: 80vh;
//   background: #ffffff;
//   box-shadow: 0 2px 4px 0 #e3e9f3;
//   border-radius: 3px;
//   line-height: 18px;
// `

export const StyledRightPanelContainer = styled.div`
  flex: 1 1 150px;
  margin: 10px 20px 10px 20px;
  background: #ffffff;
  // box-shadow: 0 2px 4px 0 #e3e9f3;
  border-style: solid;
  border-color: #e3e9f3;
  border-radius: 3px;
  line-height: 18px;
`

export const StyledRightContainer = styled.div`
  width: 100%;
  height: 20vh;
  overflow: auto;
`

export const StyledCard = styled.div`
  background: #e3e9f3;
  padding: 8px;
  margin: 10px;
  border: 1px dashed gray;
`



