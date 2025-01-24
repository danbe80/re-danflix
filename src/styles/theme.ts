import { DefaultTheme } from "styled-components";

export const theme:DefaultTheme = {
  red:{
    normal: "#E50914",
    darker : "#c20811"
  },
  black: {
    dark: "#000000",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    darker: "#dfe4ea",
    lighter: "#ffffff",
  },

  // LOGO
  logo: {
    color: "#5EFF84",
    family: "Jaro", // LOGO font
  },

   // 공통 버튼 
   commonBtn : {
    stroke: '#A1A1A1',
    fill: '#5EFF84',
    hoverFill : '#00A727',
    shadow: 'rgba(0,0,0,0.25)',
  },

  // 반응형 적용
  size: {
    mobile: '376px',
    mobileL: '426px',
    tablet: '769px',
    tabletL: '831px',
    labtop: '1025px',
    labtopL: '1441px',
    desktop: '2560px',
  },
 
}