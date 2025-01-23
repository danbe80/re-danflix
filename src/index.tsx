import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./Components/App";
import GlobalStyle from "./styles/globalStyle";
import { theme } from "./styles/theme";

const client = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </RecoilRoot>
  ,
  document.getElementById("root")
);
