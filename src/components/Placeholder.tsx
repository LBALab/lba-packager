import React from 'react';
import { Typography } from '@mui/material';
import { TableCell, TableRow } from './style/styled-components';

export function Placeholder({ height }: { height: number }) {
  return (
    <>
      <TableRow>
        <TableCell colSpan={8} sx={{ height: `${height}px` }}>
          <Typography variant="h3" align="center">
            <img src="logo200.png" />
          </Typography>
          <Typography variant="h3" align="center">
            No file selected
          </Typography>
          <Typography variant="body1" align="center">
            Click the button above to open a HQR, VOX, ILE or OBL file.
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}
