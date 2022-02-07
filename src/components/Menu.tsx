import React, { useCallback } from 'react';
import { Button, Chip, Stack } from '@mui/material';
import {
  OpenInBrowser,
  SaveAlt,
  Save,
  SaveAs,
  GitHub,
} from '@mui/icons-material';
import { HQRInfo } from '../types';
import { saveHQR, showOpenHQRFileDialog } from '../services/hqr-files';
import { ViewerContext } from './Viewer';

interface Props {
  setHQRInfo: (hqr: HQRInfo | null) => void;
  modified: boolean;
}

export default function Menu({ setHQRInfo, modified }: Props) {
  const { hqrInfo } = React.useContext(ViewerContext);

  const openDialog = useCallback(() => {
    void showOpenHQRFileDialog().then(setHQRInfo);
  }, [setHQRInfo]);

  const save = useCallback(
    (showPicker: boolean) => {
      if (hqrInfo) {
        saveHQR(hqrInfo, showPicker);
        setHQRInfo(hqrInfo); // This is to reset the replacedEntries state
      }
    },
    [hqrInfo]
  );

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
          startIcon={<OpenInBrowser />}
        >
          Open
        </Button>
        {hqrInfo && !hqrInfo.fileHandle && (
          <Button
            onClick={() => save(false)}
            variant="contained"
            startIcon={<SaveAlt />}
            disabled={!modified}
          >
            Download
          </Button>
        )}
        {hqrInfo && hqrInfo.fileHandle && (
          <>
            <Button
              onClick={() => save(false)}
              variant="contained"
              startIcon={<Save />}
              disabled={!modified}
            >
              Save
            </Button>
            <Button
              onClick={() => save(true)}
              variant="contained"
              startIcon={<SaveAs />}
              disabled={!modified}
            >
              Save as
            </Button>
          </>
        )}
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
          icon={<GitHub />}
          component="a"
          href="https://github.com/LBALab/lba-packager"
          target="_blank"
          sx={{ cursor: 'pointer' }}
        />
      )}
    </Stack>
  );
}
