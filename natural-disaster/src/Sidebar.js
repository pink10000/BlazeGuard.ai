import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box } from '@mui/material';
import "./App.css";
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';

export default function Sidebar( {selectedStateInfo }) {


    return (
    <div>
       
      <Drawer className='sidebar wide-sidebar'
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
          <Box 
          sx={{ width: 220 }}
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          width="100%"> 
            <ListItemText
            primary={selectedStateInfo ? selectedStateInfo.name : "Select a state"}
            primaryTypographyProps={{ variant: 'body1', style: { fontFamily: 'Poppins', fontWeight: 500 }}}
            />
            </Box>
          </ListItem> 
          <Divider variant="middle" />
          <ListItem>
          <Box 
          display="flex" 
          alignItems="left" 
          justifyContent="left"
          width="100%"> 
            <Button variant="normal" startIcon={<MenuBookIcon />}>Resources</Button>
        </Box>
          </ListItem> 

          <ListItem>
          <Box 
          display="flex" 
          alignItems="left" 
          justifyContent="left"
          width="100%"> 
            <Button variant="normal" startIcon={<AttachMoneyIcon />}>Donate</Button>
        </Box>
          </ListItem> 
        </List>
      </Drawer> 
      </div> 

    );
  }
  