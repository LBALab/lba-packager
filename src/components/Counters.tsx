import React from 'react';
import { Chip, Stack } from '@mui/material';
import { HQR } from '@lbalab/hqr';

interface Props {
  hqr: HQR;
}

export default function Counters({ hqr }: Props) {
  const blankCount = hqr.entries.filter(e => e === null).length;
  const hiddenCount = hqr.entries.reduce((acc, e) => {
    let count = 0;
    let h = e?.next;
    while (h) {
      count++;
      h = h.next;
    }
    return acc + count;
  }, 0);
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        label={`${hqr.entries.length} entries`}
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
  );
}
