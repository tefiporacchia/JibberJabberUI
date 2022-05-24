import React from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Home, Person } from '@mui/icons-material'
import Toolbar from '@mui/material/Toolbar'


export type SideBarProps = {
  mobileOpen: boolean
  onSideBarToggle: () => void
}

const items = [
  {
    title: 'Home',
    path: '/',
    iconComponent: Home,
  },
  {
    title: 'Profile',
    path: '/profile',
    iconComponent: Person,
  },
]

const drawerWidth = 240

export const SideBar = ({mobileOpen, onSideBarToggle}: SideBarProps) => {
  const drawer = (
    <>
      <Toolbar/>
      <List>
        {items.map(({path, title, iconComponent}) => {
          const Icon = iconComponent
          return (
            <ListItem key={path} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon/>
                </ListItemIcon>
                <ListItemText primary={title}/>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onSideBarToggle}
        ModalProps={{keepMounted: true}}
        sx={{
          display: {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {xs: 'none', sm: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  )
}
