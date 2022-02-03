import React from 'react';
import {
  EntryTableRow,
  BlankTableCell,
  TableCell,
} from './style/styled-components';
import { HQRInfo } from '../types';

interface Props {
  hqrInfo: HQRInfo;
  index: number;
}

export default function BlankEntry({ hqrInfo, index }: Props) {
  return (
    <EntryTableRow>
      <TableCell />
      <TableCell align="right">{index}</TableCell>
      <BlankTableCell align="center" colSpan={5}>
        Blank entry
      </BlankTableCell>
      <TableCell>{hqrInfo.metadata?.entries[index]?.description}</TableCell>
    </EntryTableRow>
  );
}
