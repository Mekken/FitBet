import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007cc3"
    },
    secondary: {
      main: "#001f31"
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Quicksand",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol"
    ].join(","),

    htmlFontSize: 14
  }
});

export default theme;
