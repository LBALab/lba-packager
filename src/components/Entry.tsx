/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { HQREntryElement } from '@lbalab/hqr';
import ValidEntry from './ValidEntry';
import BlankEntry from './BlankEntry';

interface Props {
  entry: HQREntryElement;
  index: number;
}

export default function Entry({ entry, index }: Props) {
  if (!entry) {
    return <BlankEntry index={index} />;
  }
  return <ValidEntry entry={entry} index={index} />;
}
