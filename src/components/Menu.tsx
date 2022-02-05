import React, { useCallback } from 'react';
import { Button, Chip, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import { HQRInfo } from '../types';
import { saveHQR, showOpenHQRFileDialog } from '../services/hqr-files';
import { ViewerContext } from './Viewer';

interface Props {
  setHQRInfo: (hqr: HQRInfo | null) => void;
  modified: boolean;
}

export default function Menu({ setHQRInfo, modified }: Props) {
  const { hqrInfo } = React.useContext(ViewerContext);
  const [saving, setSaving] = React.useState(false);

  const openDialog = useCallback(() => {
    void showOpenHQRFileDialog().then(setHQRInfo);
  }, [setHQRInfo]);

  const save = useCallback(() => {
    if (hqrInfo) {
      setSaving(true);
      saveHQR(hqrInfo);
      setHQRInfo(hqrInfo); // This is to reset the replacedEntries state
      setSaving(false);
    }
  }, [hqrInfo]);

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
        <LoadingButton
          onClick={() => save()}
          variant="contained"
          loading={saving}
          loadingPosition="start"
          startIcon={<SaveAltIcon />}
          disabled={!modified}
        >
          Save
        </LoadingButton>
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
