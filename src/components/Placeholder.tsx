import React from 'react';
import { Typography, Link } from '@mui/material';
import { TableCell, TableRow } from './style/styled-components';

export function Placeholder({ height }: { height: number }) {
  return (
    <>
      <TableRow>
        <TableCell colSpan={9} sx={{ height: `${height}px` }}>
          <Typography variant="h3" align="center">
            <img src="logo200.png" />
          </Typography>
          <Typography variant="h3" align="center">
            No file selected
          </Typography>
          <Typography variant="body1" align="center">
            Click the button above to open a HQR, VOX, ILE or OBL file.
          </Typography>
          <Typography variant="body2" align="center" mt={1}>
            More information about HQR files&nbsp;
            <Link
              href="http://lbafileinfo.kaziq.net/index.php/High_quality_resource"
              target="_blank"
            >
              here
            </Link>
            .
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}
