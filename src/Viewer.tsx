/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {
  Button,
  Link,
  Chip,
  Typography,
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow as TableRowMUI,
  TableCell as TableCellMUI,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import { HQRInfo, showOpenHQRFileDialog } from './file-dialog';
import { HQREntry } from '@lbalab/hqr';

const compressionTypes = ['NONE', 'LZSS/1', 'LZSS/2'];

const containerStyle = {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const TableCell = styled(TableCellMUI)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:first-child': {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const BlankTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.error.dark,
}));

const TableRow = styled(TableRowMUI)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function humanFileSize(bytes: number, dp = 1): string {
  const thresh = 1000;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} bytes`;
  }

  const units = ['KB', 'MB', 'GB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return `${bytes.toFixed(dp)} ${units[u]}`;
}

function compressionRatio(entry: HQREntry): string {
  if (entry.metadata.compressedSize && entry.metadata.originalSize) {
    const ratio = entry.metadata.compressedSize / entry.metadata.originalSize;
    return `${Math.round(ratio * 100)}% of original size`;
  }
  return 'N/A';
}

export default function Viewer() {
  const [hqr, setHQR] = React.useState<HQRInfo | null>(null);
  const openDialog = () => {
    void showOpenHQRFileDialog().then(setHQR);
  };
  const blankCount = hqr && hqr.hqr.entries.filter(e => e === null).length;
  const hiddenCount =
    hqr &&
    hqr.hqr.entries.reduce((acc, e) => {
      let count = 0;
      let h = e?.next;
      while (h) {
        count++;
        h = h.next;
      }
      return acc + count;
    }, 0);
  return (
    <Stack sx={containerStyle} spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            onClick={openDialog}
            variant="contained"
            startIcon={<OpenInBrowserIcon />}
          >
            Open
          </Button>
          <Button variant="contained" startIcon={<SaveAltIcon />} disabled>
            Save
          </Button>
        </Stack>
        {hqr && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={`${hqr.hqr.entries.length} entries`}
              color="success"
              variant="outlined"
            />
            <Chip
              label={`${hiddenCount} hidden entries`}
              color="info"
              variant="outlined"
            />
            <Chip
              label={`${blankCount} blank entries`}
              color="error"
              variant="outlined"
            />
          </Stack>
        )}
        {hqr && <Chip label={hqr.filename} onDelete={() => setHQR(null)} />}
      </Stack>
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
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Entry</TableCell>
              <TableCell align="right">Offset</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Compressed</TableCell>
              <TableCell>Compression Type</TableCell>
              <TableCell>Kind</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!hqr && (
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
            )}
            {hqr &&
              hqr.hqr.entries.map((entry, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx}
                  </TableCell>
                  {entry ? (
                    <>
                      <TableCell align="right">
                        {entry.metadata.offset}
                      </TableCell>
                      {entry.type === 0 ? (
                        <>
                          <TableCell align="right">
                            {humanFileSize(entry.metadata.originalSize!)}
                          </TableCell>
                          <TableCell />
                        </>
                      ) : (
                        <>
                          <TableCell align="right">
                            {humanFileSize(entry.metadata.originalSize!)}
                          </TableCell>
                          <Tooltip title={compressionRatio(entry)}>
                            <TableCell align="right">
                              {humanFileSize(entry.metadata.compressedSize!)}
                            </TableCell>
                          </Tooltip>
                        </>
                      )}
                      <TableCell>{compressionTypes[entry.type]}</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </>
                  ) : (
                    <>
                      <BlankTableCell align="center" colSpan={4}>
                        Blank entry
                      </BlankTableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{ height: 0, background: 'black' }}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
