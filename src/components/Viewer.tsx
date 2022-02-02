/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {
  Paper,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { HQRInfo } from '../types';
import { TableCell, TableRow } from './style/styled-components';
import { Placeholder } from './Placeholder';
import Entry from './Entry';
import Menu from './Menu';
import Counters from './Counters';

export default function Viewer() {
  const [hqrInfo, setHQRInfo] = React.useState<HQRInfo | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [winHeight, setWinHeight] = React.useState(window.innerHeight);
  const handleResize = () => {
    setWinHeight(window.innerHeight);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const height = winHeight - 120;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
      <Menu hqrInfo={hqrInfo} setHQRInfo={setHQRInfo} />
      <TableContainer sx={{ height, maxHeight: height }}>
        <Table size="small" aria-label="sticky table" stickyHeader>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '40%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Entry</TableCell>
              <TableCell align="right">Offset</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Compressed</TableCell>
              <TableCell>Compression</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableContent
              hqrInfo={hqrInfo}
              page={page}
              rowsPerPage={rowsPerPage}
              height={height - 55}
            />
            <Footer />
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ ml: 1 }}
      >
        {hqrInfo ? <Counters hqr={hqrInfo.hqr} /> : <div />}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 200]}
          component="div"
          count={hqrInfo ? hqrInfo.hqr.entries.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Paper>
  );
}

interface ContentProps {
  hqrInfo: HQRInfo | null;
  page: number;
  rowsPerPage: number;
  height: number;
}

function TableContent({ hqrInfo, page, rowsPerPage, height }: ContentProps) {
  if (!hqrInfo) {
    return <Placeholder height={height} />;
  }

  const { entries } = hqrInfo.hqr;
  const offset = page * rowsPerPage;
  const entriesSliced = entries.slice(offset, offset + rowsPerPage);
  return (
    <>
      {entriesSliced.map((entry, idx) => (
        <Entry
          key={offset + idx}
          entry={entry}
          index={offset + idx}
          hqrInfo={hqrInfo}
        />
      ))}
    </>
  );
}

function Footer() {
  return (
    <TableRow>
      <TableCell
        colSpan={7}
        sx={{ height: 0, padding: 0, border: 0, background: 'black' }}
      ></TableCell>
    </TableRow>
  );
}
