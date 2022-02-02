/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { HQREntryElement } from '@lbalab/hqr';
import { HQRInfo } from '../types';
import ValidEntry from './ValidEntry';
import BlankEntry from './BlankEntry';
import { DataTypes } from '../services/metadata';

interface Props {
  hqrInfo: HQRInfo;
  entry: HQREntryElement;
  index: number;
  dataTypes: DataTypes | null;
}

export default function Entry({ entry, index, hqrInfo, dataTypes }: Props) {
  if (!entry) {
    return <BlankEntry hqrInfo={hqrInfo} index={index} />;
  }
  return (
    <ValidEntry
      hqrInfo={hqrInfo}
      entry={entry}
      index={index}
      dataTypes={dataTypes}
    />
  );
}
