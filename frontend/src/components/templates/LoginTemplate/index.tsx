import { Grid } from '@mui/material'
import React from 'react'
import CustomImage from '../../atoms/Image'


export type LoginSignupTemplateProps = {
  image: string
  children?: React.ReactNode
}

const LoginSignupTemplate = (props: LoginSignupTemplateProps) => {
  const { image, children } = props
  return (
    <Grid
      container
      width={'100%'}
      data-testid="loginSignupTemplate"
      height={'100vh'}
      sx={{ overflow:'hidden'}}
    >
      <Grid item xs={6.5} width={'100%'}  >
        <CustomImage
          src={image}
          width={'100%'}
          height={'100%'}
          alt={'template image'}
           
        />
      </Grid>
      <Grid item xs={5} width={'100%'} sx={{ paddingLeft: '4vw', paddingTop: '9vh' }}>
        {children}
      </Grid>
    </Grid>
  )
}

export default LoginSignupTemplate
