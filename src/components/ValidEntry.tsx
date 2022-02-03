/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowDown,
  HideSource,
} from '@mui/icons-material';
import { CompressionType, HQREntryBase } from '@lbalab/hqr';
import { HQRInfo } from '../types';
import { compressionRatio, humanFileSize } from '../utils';
import { EntryTableRow, TableCell } from './style/styled-components';
import EntryType from './EntryType';
import { DataTypes } from '../services/metadata';

const compressionTypes = ['NONE', 'LZSS/1', 'LZSS/2'];

interface Props {
  hqrInfo: HQRInfo;
  entry: HQREntryBase;
  index: number;
  dataTypes: DataTypes | null;
  hidden?: boolean;
}

export default function ValidEntry({
  entry,
  index,
  hqrInfo,
  dataTypes,
  hidden = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { metadata } = hqrInfo;
  const hiddenEntries: HQREntryBase[] = entry.hiddenEntries;
  const hasHiddenEntries = !hidden && hiddenEntries.length > 0;
  return (
    <>
      <EntryTableRow
        sx={
          hidden
            ? {
                bgcolor: '#f3e5f5',
                '&:nth-of-type(odd)': {
                  bgcolor: '#f3e5f5',
                },
              }
            : undefined
        }
      >
        <TableCell>
          {hasHiddenEntries && (
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{ p: 0 }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>
          )}
        </TableCell>
        <TableCell align="right">
          {hidden ? (
            <HideSource sx={{ fontSize: 14 }} color="secondary" />
          ) : (
            index
          )}
        </TableCell>
        <TableCell align="right">{entry.metadata.offset}</TableCell>
        {entry.type === CompressionType.NONE ? (
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
        <TableCell>
          {!hidden && (
            <EntryType
              metadata={metadata?.entries[index]}
              dataTypes={dataTypes}
            />
          )}
        </TableCell>
        <TableCell>
          {!hidden && metadata?.entries[index]?.description}
        </TableCell>
      </EntryTableRow>
      {open &&
        hiddenEntries.map((hEntry, idx) => (
          <ValidEntry
            key={idx}
            hqrInfo={hqrInfo}
            entry={hEntry}
            index={idx}
            dataTypes={dataTypes}
            hidden={true}
          />
        ))}
    </>
  );
}
