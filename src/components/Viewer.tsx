/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Paper,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  Link,
  IconButton,
} from '@mui/material';
import { Help, Download } from '@mui/icons-material';
import { HQRInfo } from '../types';
import { TableCell, TableRow } from './style/styled-components';
import TableContent from './TableContent';
import Menu from './Menu';
import Counters from './Counters';
import { DataTypes, getDataTypes } from '../services/metadata';
import { saveAllEntriesAsZip } from '../services/entry-actions';

interface ViewerContextValue {
  hqrInfo: HQRInfo | null;
  dataTypes: DataTypes | null;
  markModified: () => void;
}

export const ViewerContext = React.createContext<ViewerContextValue>({
  hqrInfo: null,
  dataTypes: null,
  markModified: () => {
    /* noop */
  },
});

export default function Viewer() {
  const [modified, setModified] = React.useState(false);
  const [hqrInfo, setHQRInfo] = React.useState<HQRInfo | null>(null);
  const [dataTypes, setDataTypes] = React.useState<DataTypes | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);

  const handleResize = () => {
    setWinHeight(window.innerHeight);
  };

  const markModified = React.useCallback(() => {
    setModified(true);
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    getDataTypes().then(setDataTypes).catch(console.error);
  }, []);

  const setHQRInfoWrapper = React.useCallback((hqrInfo: HQRInfo | null) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setHQRInfo(hqrInfo);
      setModified(false);
    });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    });
  };

  const saveAllEntries = React.useCallback(() => {
    if (hqrInfo) {
      void saveAllEntriesAsZip(hqrInfo, dataTypes);
    }
  }, [hqrInfo, dataTypes]);

  const height = winHeight - 120;

  return (
    <ViewerContext.Provider value={{ hqrInfo, dataTypes, markModified }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
        <Menu setHQRInfo={setHQRInfoWrapper} modified={modified} />
        <TableContainer sx={{ height, maxHeight: height }}>
          <Table size="small" aria-label="sticky table" stickyHeader>
            <colgroup>
              <col style={{ width: '0%' }} />
              <col style={{ width: '0%' }} />
              <col style={{ width: '0%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '50%' }} />
              <col style={{ width: '0%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">#</TableCell>
                <TableCell align="right">Offset</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Compressed</TableCell>
                <TableCell>Compression</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    Type&nbsp;
                    <Tooltip title="Entries type information come from: https://github.com/LBALab/metadata">
                      <Link
                        href="https://github.com/LBALab/metadata"
                        target="_blank"
                      >
                        <Help sx={{ fontSize: 14, color: 'info.main' }} />
                      </Link>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    Description&nbsp;
                    <Tooltip title="Entries descriptions come from: https://github.com/LBALab/metadata">
                      <Link
                        href="https://github.com/LBALab/metadata"
                        target="_blank"
                      >
                        <Help sx={{ fontSize: 14, color: 'info.main' }} />
                      </Link>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell align="right">
                  {hqrInfo && (
                    <Tooltip title="Download all entries as a ZIP file">
                      <IconButton
                        onClick={saveAllEntries}
                        aria-label="download all entries"
                        size="small"
                        sx={{ p: 0, color: 'white' }}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableContent
                page={page}
                rowsPerPage={rowsPerPage}
                height={height - 55}
              />
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{ height: 0, padding: 0, border: 0, background: 'black' }}
                ></TableCell>
              </TableRow>
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
            rowsPerPageOptions={[10, 15, 20, 50, 100, 200]}
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
    </ViewerContext.Provider>
  );
}
