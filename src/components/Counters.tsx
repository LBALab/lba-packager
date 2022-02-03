import React from 'react';
import { Chip, Stack } from '@mui/material';
import { HQR, HQREntryBase } from '@lbalab/hqr';

interface Props {
  hqr: HQR;
}

export default function Counters({ hqr }: Props) {
  const blankCount = hqr.entries.filter(e => e === null).length;
  const hiddenCount = hqr.entries.reduce((acc, e) => {
    if (e === null) return acc;
    const hEntries: HQREntryBase[] = e.hiddenEntries;
    return acc + hEntries.length;
  }, 0);
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        label={`${hqr.entries.length} entries`}
        color="success"
        variant="outlined"
        size="small"
      />
      <Chip
        label={`${hiddenCount} hidden entries`}
        color="secondary"
        variant="outlined"
        size="small"
      />
      <Chip
        label={`${blankCount} blank entries`}
        color="error"
        variant="outlined"
        size="small"
      />
    </Stack>
  );
}
