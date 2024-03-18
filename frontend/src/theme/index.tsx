import { createTheme } from '@mui/material/styles'
import "../App.css"

declare module '@mui/material/styles' {
  
  interface Palette {
    structural: Palette['primary']
    textColor: Palette['primary']
  }

  interface PaletteOptions {
    structural: PaletteOptions['primary']
    textColor?: PaletteOptions['primary']
  }

  interface PaletteColor {
    500?: string
    400?: string
    300?: string
    200?: string
    100?: string
    50?:string
    scrollTrack?:string
    white?: string
    structural?:string
    black?: string
    overlay?: string
    gradient?: string
    border?: string
    scrollbg?: string
    overlay2?: string
    overlay3?: string
    overlay4?: string
    highEmphasis?: string
    mediumEmphasis?: string
    lowEmphasis?: string
    highlight?:string
  }

  interface SimplePaletteColorOptions {
    500?: string
    400?: string
    300?: string
    200?: string
    100?: string
    50?:string
    scrollTrack?:string
    white?: string
    structural?:string
    black?: string
    overlay?: string
    gradient?: string
    border?: string
    scrollbg?: string
    overlay2?: string
    overlay3?: string
    overlay4?: string
    highEmphasis?: string
    mediumEmphasis?: string
    lowEmphasis?: string
    highlight?:string
  }

  interface TypeText {
    highemp: string
    medemp: string
    lowemp: string
  }

  interface TypographyVariants {
    header1: TypographyStyle
    header2: TypographyStyle
    header3: TypographyStyle 
    subtitle1: TypographyStyle
    subtitle2: TypographyStyle
    body1: TypographyStyle
    body2: TypographyStyle
    body3: TypographyStyle
    caption1: TypographyStyle 
    button: TypographyStyle
    overline: TypographyStyle
    overline2: TypographyStyle
  }

  interface TypographyVariantsOptions {
    header1?: TypographyStyle
    header2?: TypographyStyle
    header3?: TypographyStyle 
    subtitle1?: TypographyStyle
    subtitle2?: TypographyStyle
    body1?: TypographyStyle
    body2?: TypographyStyle
    body3?: TypographyStyle
    caption1?: TypographyStyle 
    button?: TypographyStyle
    overline?: TypographyStyle
    overline2?: TypographyStyle
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    header1: true
    header2: true
    header3: true 
    subtitle1: true
    subtitle2: true
    body1: true
    body2: true
    body3:true
    caption1: true 
    button: true
    overline: true
    overline2: true
  }
}

interface TypographyStyle { 
    fontFamily: string
    fontSize: string
    fontWeight: string
    lineHeight: string 
}

const theme = createTheme({
  
  spacing: 4,
  palette: {
    primary: {
      100: '#F2EAFD',
      300: '#0B69FF',
      400: '#1e88e5',
      500: '#8B3DFF',
      700: '##7F56DA'
    },
    grey: {
      50: '#D9D9D9',
      100: '#BFC4C8',
      200: '#959596',
      300: '#343536',
      400: '#252627',
      500: '#18191B',
      600: '#D7DFE980',
    },
    error: {
      500: '#FF0000',
    },
    structural: {
      scrollTrack: '#F0F0F0',
      main: '#F8F9F9',
      white: '#FFFFFF',
      structural:'#F4F5F5',
      gradient: 'linear-gradient(to right, #05BDCD 10.18%, #7C2BE8 108.2%)',
      border: '#BFC4C8',
      scrollbg: '#F4F5F5',
      overlay: 'rgba(224, 224, 224, 0.8)',
      overlay2:
        'linear-gradient(0deg, rgba(95, 64, 163, 0.74), rgba(95, 64, 163, 0.74)), url(.jpg)',
      overlay3: 'rgba(215, 223, 233, 0.50)',
      overlay4: 'rgba(215, 223, 233, 0.38)',
      highlight:"rgba(255,215,73,0.25)",
    },
    textColor: {
      main: '#000',
      highEmphasis: '#D3D4D4',
      mediumEmphasis: '#959596',
      lowEmphasis: '#707477',
      black: '#2A3238',
      border:'#000'
    },
    text: {
      highemp: '#343446',
      medemp: '#7D7D89',
      lowemp: '#B2B2B9',
    },
  },

  typography: {
    header1: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: "600",
      fontSize: '56px',
      lineHeight: '76.5px',
    },
    header2: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight:" 600",
      fontSize: '24px',
      lineHeight: '32px',
    },
    header3: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: "600",
      fontSize: '20px',
      lineHeight: '22px',
    },
    subtitle1: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: "400",
      fontSize: '18px',
      lineHeight: '24px',
    },
    subtitle2: {
      fontFamily: 'Manrope-SemiBold',
      fontWeight: "600",
      fontSize: '16px',
      lineHeight: '26px',
    },
    body1: {
      fontFamily: 'Manrope-Regular',
      fontWeight: "600",
      fontSize: '14px',
      lineHeight: '22px',
    },
    body2: {
      fontFamily: 'Manrope-Regular',
      fontWeight:" 400",
      fontSize: '14px',
      lineHeight: '22px',
    },
    body3: {
      fontFamily: 'Manrope-Regular',
      fontWeight:" 400",
      fontSize: '12px',
      lineHeight: '18px',
    },
    caption1: {
      fontFamily: 'Manrope-Regular',
      fontWeight: "700",
      fontSize: '12px',
      lineHeight: '20px',
    },
    overline: {
      fontFamily: 'Manrope-regular',
      fontWeight: "600",
      fontSize: '10px',
      lineHeight: '16px',
    },
     overline2: {
      fontFamily: 'Manrope-regular',
      fontWeight:" 600",
      fontSize: '10px',
      lineHeight: '16px',
    },
  },
  
})

export default theme
