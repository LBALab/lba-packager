import React from 'react';
import { BlankTableCell, TableCell } from './style/styled-components';
import { HQRInfo } from '../types';

interface Props {
  hqrInfo: HQRInfo;
  index: number;
}

export default function BlankEntry({ hqrInfo, index }: Props) {
  return (
    <>
      <BlankTableCell align="center" colSpan={4}>
        Blank entry
      </BlankTableCell>
      <TableCell />
      <TableCell>{hqrInfo.metadata?.entries[index]?.description}</TableCell>
    </>
  );
}
