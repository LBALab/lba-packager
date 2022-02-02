import React, { useCallback } from 'react';
import { Button, Chip, Stack } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import { HQRInfo } from '../types';
import { showOpenHQRFileDialog } from '../services/file-dialog';

interface Props {
  hqrInfo: HQRInfo | null;
  setHQRInfo: (hqr: HQRInfo | null) => void;
}

export default function Menu({ hqrInfo, setHQRInfo }: Props) {
  const openDialog = useCallback(() => {
    void showOpenHQRFileDialog().then(setHQRInfo);
  }, [setHQRInfo]);

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 0.5 }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
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
      {hqrInfo?.metadata?.description && (
        <Chip
          label={hqrInfo.metadata?.description}
          color="primary"
          variant="outlined"
        />
      )}
      {hqrInfo && (
        <Chip label={hqrInfo.filename} onDelete={() => setHQRInfo(null)} />
      )}
      {!hqrInfo && (
        <Chip
          label="Contribute to this project"
          icon={<GitHubIcon />}
          component="a"
          href="https://github.com/LBALab/lba-packager"
          target="_blank"
          sx={{ cursor: 'pointer' }}
        />
      )}
    </Stack>
  );
}
