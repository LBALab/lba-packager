/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { HQREntryElement } from '@lbalab/hqr';
import { HQRInfo } from '../types';
import { EntryTableRow, TableCell } from './style/styled-components';
import ValidEntry from './ValidEntry';
import BlankEntry from './BlankEntry';

interface Props {
  hqrInfo: HQRInfo;
  entry: HQREntryElement;
  index: number;
}

export default function Entry({ entry, index, hqrInfo }: Props) {
  return (
    <EntryTableRow>
      <TableCell>{index}</TableCell>
      {entry ? (
        <ValidEntry hqrInfo={hqrInfo} entry={entry} index={index} />
      ) : (
        <BlankEntry hqrInfo={hqrInfo} index={index} />
      )}
    </EntryTableRow>
  );
}
