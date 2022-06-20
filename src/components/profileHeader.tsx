import { Avatar, Card, CardActions, CardContent, Container, Divider, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { ReactNode } from 'react'
import { User } from '../data/users'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { useKeycloak } from "@react-keycloak/web";

export type ProfileHeaderProps = {
  user: User
  actions?: ReactNode
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

export const ProfileHeader = ({user, actions}: ProfileHeaderProps) => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            {/*<Avatar src={user.avatar} sx={avatarStyle}/>*/}
          </Grid>
          <Grid item xs={9}>
            <Container sx={profileTextStyle}>
              <Typography variant="h5" component="span">
                {keycloak.tokenParsed?.given_name + ' '}
              </Typography>
              <Typography variant="body1" component="span">
                {`@${keycloak.tokenParsed?.preferred_username}`}
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
      </CardContent>
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </Card>
  )
}