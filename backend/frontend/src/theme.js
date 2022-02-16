import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    'palette' : {
      'primary' : {
        'main' : '#010645',
      },
      'secondary' : {
        'main' : '#F0C035',
      }, 
      'text' : {
        'primary' : '#fff', 
        'secondary' : '#fff', 

      }, 
      'background' : {
        'default' : /* '#010645' */'#000', 
        'paper' : /* '#010645' */'#000'
      },
      'action' : {
        'hover' : 'rgba(0,0,0,0.15)' 
      }
    }, 
    'typography': {
      'allVariants': {
        'color' : "white"
      },
      'fontFamily' : 'Merriweather serif',
      'h4': {
        'fontSize': '2rem'
      }, 
      'subtitle1' : {
        'fontSize' : '1.15rem', 
      },
    },
  })

export default theme 