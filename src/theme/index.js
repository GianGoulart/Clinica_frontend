import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    secondary: {
        light: "#ff5983",
        main: "#f50057",
        dark: "#bb002f",
    },
    error: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
    },
    warning: {
        light: "#ffc947",
        main: "#ff9800",
        dark: "#c66900",
    },
    info: {
        light: "#6ec6ff",
        main: "#2196f3",
        dark: "#0069c0",
    },
    success: {
        light: "#64ff60",
        main: "#00D62A",
        dark: "#00a300",
    },    
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
