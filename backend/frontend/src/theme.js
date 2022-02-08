import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    'palette' : {
      'primary' : {
        'main' : '#010645'
      },
      'secondary' : {
        'main' : '#F0C035'
      }, 
      'text' : {
        'primary' : 'white', 
      }, 
      'background' : {
        'default' : '#010645', 
        'paper' : '#010645'
      },
    }, 
    'typography': {
      'allVariants': {
        'color' : "white"
      },
    },
  })

export default theme 