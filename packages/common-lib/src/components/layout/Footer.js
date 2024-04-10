import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'

const styles = {
  BottomNavigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
}

export default function Footer() {
  const [value, setValue] = React.useState(0)

  return (
    <Box
      sx={{
        width: 500,
        position: 'fixed',
        height: '67px',
        bottom: 0,
        background: '#fff',
        width: '100%',
        boxShadow: '0px -1px 4px 0px #00000040'
      }}
    >
      <BottomNavigation
        sx={{
          width: '100%',
          display: 'flex',
          position: 'relative',
          padding: '4px 0'
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          className='navigateActive'
          label='Search'
          icon={<SearchSharpIcon />}
        />
        <BottomNavigationAction
          label='Content'
          icon={<EditNoteOutlinedIcon />}
        />
        <BottomNavigationAction
          label='Connections'
          icon={<GroupsOutlinedIcon />}
        />
        <BottomNavigationAction
          label='Profile'
          icon={<AccountCircleOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}
