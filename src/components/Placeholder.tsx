import React from 'react';
import { Button, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { TableCell, TableRow } from './style/styled-components';

export function Placeholder() {
  return (
    <TableRow>
      <TableCell colSpan={7} sx={{ padding: 10 }}>
        <Typography variant="h3" align="center">
          <img src="logo200.png" />
        </Typography>
        <Typography variant="h3" align="center">
          No file selected
        </Typography>
        <Typography variant="body1" align="center">
          Click the button above to open a HQR, VOX, ILE or OBL file.
          <br />
          <br />
          <Link
            href="https://github.com/LBALab/lba-packager"
            underline="none"
            target="_blank"
          >
            <Button endIcon={<GitHubIcon />} variant="outlined">
              Contribute
            </Button>
          </Link>
        </Typography>
      </TableCell>
    </TableRow>
  );
}
