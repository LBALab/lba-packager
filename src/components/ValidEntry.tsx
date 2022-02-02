/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Tooltip } from '@mui/material';
import { CompressionType, HQREntryBase } from '@lbalab/hqr';
import { HQRInfo } from '../types';
import { compressionRatio, humanFileSize } from '../utils';
import { TableCell } from './style/styled-components';
import EntryType from './EntryType';
import { DataTypes } from '../services/metadata';

const compressionTypes = ['NONE', 'LZSS/1', 'LZSS/2'];

interface Props {
  hqrInfo: HQRInfo;
  entry: HQREntryBase;
  index: number;
  dataTypes: DataTypes | null;
}

export default function ValidEntry({
  entry,
  index,
  hqrInfo,
  dataTypes,
}: Props) {
  const { metadata } = hqrInfo;
  return (
    <>
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
        <EntryType metadata={metadata?.entries[index]} dataTypes={dataTypes} />
      </TableCell>
      <TableCell>{metadata?.entries[index]?.description}</TableCell>
    </>
  );
}
