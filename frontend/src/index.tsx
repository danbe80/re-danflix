import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
// import { ThemeProvider } from "styled-components";
import App from "./Components/App";
// import GlobalStyle from "./styles/globalStyle";
import { theme } from "./styles/theme";
import "./index.css"; // ⬅️ 이 경로가 맞아야 Tailwind 작동함!

const client = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <QueryClientProvider client={client}>
        {/* <ThemeProvider theme={theme}> */}
        {/* <GlobalStyle /> */}
        <App />
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);
