/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {
  Stack,
  Table,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
import { HQRInfo } from '../types';
import { TableCell, TableRow } from './style/styled-components';
import { Placeholder } from './Placeholder';
import Entry from './Entry';
import Menu from './Menu';

const containerStyle = {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

export default function Viewer() {
  const [hqrInfo, setHQRInfo] = React.useState<HQRInfo | null>(null);

  return (
    <Stack sx={containerStyle} spacing={1}>
      <Menu hqrInfo={hqrInfo} setHQRInfo={setHQRInfo} />
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="HQR Entries"
          stickyHeader
        >
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '50%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Entry</TableCell>
              <TableCell align="right">Offset</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Compressed</TableCell>
              <TableCell>Compression Type</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableContent hqrInfo={hqrInfo} />
            <Footer />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

function TableContent({ hqrInfo }: { hqrInfo: HQRInfo | null }) {
  if (!hqrInfo) {
    return <Placeholder />;
  }

  const { entries } = hqrInfo.hqr;
  return (
    <>
      {entries.map((entry, idx) => (
        <Entry key={idx} entry={entry} index={idx} hqrInfo={hqrInfo} />
      ))}
    </>
  );
}

function Footer() {
  return (
    <TableRow>
      <TableCell
        colSpan={7}
        sx={{ height: 0, background: 'black' }}
      ></TableCell>
    </TableRow>
  );
}
