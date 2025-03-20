import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        font-size: 100%;
        background: #f0f2f8;
        color: #4d4d4d;
    }
`

export default GlobalStyles;