// Same here, very clean, will be perfect to fill with buttons and menus later.

import { AppBar, Toolbar, Typography } from '@mui/material';

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Breeding Data Processing
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
