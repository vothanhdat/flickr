import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import * as Colors from '@material-ui/core/colors'

/**@type {ThemeOptions} */
const common = {

    typography: {
        // fontFamily: '"Helvetica Neue", sans-serif',
        fontFamily: `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`,
        fontSize: 18,
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
        subheading: {
            fontSize: "1rem",
            fontWeight: 600,
        },

    },
    overrides: {
        MuiButton: {

            flatPrimary: {
                backgroundColor: "#eee",
            },
            raised: {
                borderRadius: 100,
                padding: "0.5em 2.2em",
                boxShadow: "none",
            },
            root: {
                fontSize: "1em",
                padding: "0.5em 1.5em",
                // backgroundColor: "#d8d8d8"
            },
            raisedSecondary: {
                backgroundColor: Colors.grey["700"]
            }
        }
    },
}


export default {
    normal: createMuiTheme({
        palette: {
            primary: Colors.deepPurple,
            secondary: Colors.grey,
            accent: Colors.red,
            error: Colors.red,
        },
        ...common
    }),
    dark: createMuiTheme({
        palette: {
            primary: Colors.red,
            secondary: Colors.red,
            accent: Colors.red,
            error: Colors.red,
            type: "dark"
        },
        ...common
    })
}