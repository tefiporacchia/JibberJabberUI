import { Avatar, Container, Divider, Grid, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

export type ProfileHeaderProps = {
  user: string
}

const avatarStyle: SxProps<Theme> = {
  width: '15vw',
  maxWidth: '100%',
  height: '15vw',
  maxHeight: '100%',
  margin: '10px',
}

const profileTextStyle: SxProps<Theme> = {
  margin: '20px 0',
}

const dividerStyle: SxProps<Theme> = {
  margin: '20px 0',
}

export const ProfileHeader = ({user}: ProfileHeaderProps) => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={3}>
          {/*<Avatar src={user.avatar} sx={avatarStyle}/>*/}
        </Grid>
        <Grid item xs={9}>
          <Container sx={profileTextStyle}>
            <Typography variant="h5" component="span">
              {user + ' '}
            </Typography>
            <Typography variant="body1" component="span">
              @{user}
            </Typography>
            <Divider sx={dividerStyle}/>
            {user && (
              <Typography variant="body1" component="div">
                {user}
              </Typography>
            )}
          </Container>
        </Grid>
      </Grid>
    </Paper>
  )
}