/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Tooltip, IconButton, Stack, Badge, Chip } from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowDown,
  HideSource,
  Download,
  UploadFile,
} from '@mui/icons-material';
import { CompressionType, HQREntryBase } from '@lbalab/hqr';
import { HQRInfo } from '../types';
import { compressionRatio, humanFileSize } from '../utils';
import { EntryTableRow, TableCell } from './style/styled-components';
import EntryType from './EntryType';
import { replaceEntry, saveEntry } from '../services/entry-actions';
import { ViewerContext } from './Viewer';

const compressionTypes = ['NONE', 'LZSS/1', 'LZSS/2'];

interface Props {
  entry: HQREntryBase;
  index: number;
  parent?: HQREntryBase;
  parentIndex?: number;
}

export default function ValidEntry({
  index,
  entry,
  parent,
  parentIndex,
}: Props) {
  const {
    hqrInfo: hqrInfoMaybe,
    dataTypes,
    markModified,
  } = React.useContext(ViewerContext);
  const [open, setOpen] = React.useState(false);
  const [replacement, setReplacement] = React.useState<string | undefined>(
    entry.metadata.replacement as string
  );

  const hqrInfo = hqrInfoMaybe as HQRInfo;

  const { metadata } = hqrInfo;
  const hiddenEntries: HQREntryBase[] = entry.hiddenEntries;
  const hasHiddenEntries = !parent && hiddenEntries.length > 0;
  const replaced = !!replacement;

  const save = React.useCallback(() => {
    saveEntry(
      hqrInfo.filename,
      entry,
      index,
      metadata?.entries[index],
      dataTypes
    );
  }, [hqrInfo, entry, index, metadata, dataTypes]);

  const replace = React.useCallback(() => {
    const success = (newReplacement: string) => {
      markModified();
      setReplacement(newReplacement);
    };
    if (parentIndex !== undefined) {
      void replaceEntry(hqrInfo.hqr, parentIndex, index).then(success);
    } else {
      void replaceEntry(hqrInfo.hqr, index).then(success);
    }
  }, [hqrInfo, markModified]);

  return (
    <>
      <EntryTableRow
        sx={
          parent
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
          <Badge variant="dot" color="warning" invisible={!replaced}>
            {parent ? (
              <HideSource sx={{ fontSize: 14 }} color="secondary" />
            ) : (
              <b>{index}</b>
            )}
            &nbsp;
          </Badge>
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
          {!parent && <EntryType metadata={metadata?.entries[index]} />}
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ p: 0 }}
          >
            {(!parent && metadata?.entries[index]?.description) || <>&nbsp;</>}
            {replacement && (
              <Chip label={replacement} color="warning" size="small" />
            )}
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Tooltip title="Download entry">
              <IconButton
                onClick={save}
                aria-label="download"
                size="small"
                sx={{ p: 0 }}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Replace entry">
              <IconButton
                onClick={replace}
                aria-label="replace entry"
                size="small"
                sx={{ p: 0 }}
              >
                <UploadFile />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </EntryTableRow>
      {open &&
        hiddenEntries.map((hEntry, idx) => (
          <ValidEntry
            key={idx}
            entry={hEntry}
            index={idx}
            parent={entry}
            parentIndex={index}
          />
        ))}
    </>
  );
}
