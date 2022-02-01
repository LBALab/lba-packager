import React, { useCallback } from 'react';
import { Button, Chip, Stack } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { HQRInfo } from '../types';
import { showOpenHQRFileDialog } from '../services/file-dialog';
import Counters from './Counters';

interface Props {
  hqrInfo: HQRInfo | null;
  setHQRInfo: (hqr: HQRInfo | null) => void;
}

export default function Menu({ hqrInfo: hqr, setHQRInfo }: Props) {
  const openDialog = useCallback(() => {
    void showOpenHQRFileDialog().then(setHQRInfo);
  }, [setHQRInfo]);

  return (
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
        <>
          <Counters hqr={hqr.hqr} />
          <Chip label={hqr.filename} onDelete={() => setHQRInfo(null)} />
        </>
      )}
    </Stack>
  );
}
