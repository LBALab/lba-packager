import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { EntryMetadata } from '../services/metadata';

interface Props {
  metadata?: EntryMetadata;
}

export default function EntryType({ metadata }: Props) {
  if (!metadata) {
    return null;
  }
  let caption = null;
  let tooltip = `${metadata.type} type`;
  switch (metadata.game) {
    case 'LBA1':
    case 'LBA2':
      caption = metadata.game.substring(3);
      tooltip = `${metadata.game} ${metadata.type} type`;
      break;
  }
  return (
    <Tooltip title={tooltip}>
      <Typography variant="body1">
        {metadata.type}
        {caption && (
          <>
            &nbsp;
            <Typography
              variant="caption"
              sx={{
                background: 'rgba(0, 0, 0, 0.15)',
                borderRadius: 1,
                padding: '1px 4px',
                color: 'grey',
              }}
            >
              {caption}
            </Typography>
          </>
        )}
      </Typography>
    </Tooltip>
  );
}
