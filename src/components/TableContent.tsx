/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Placeholder } from './Placeholder';
import Entry from './Entry';
import { ViewerContext } from './Viewer';

interface Props {
  page: number;
  rowsPerPage: number;
  height: number;
}

export default function TableContent({ page, rowsPerPage, height }: Props) {
  const { hqrInfo } = React.useContext(ViewerContext);
  if (!hqrInfo) {
    return <Placeholder height={height} />;
  }

  const { entries } = hqrInfo.hqr;
  const offset = page * rowsPerPage;
  const entriesSliced = entries.slice(offset, offset + rowsPerPage);
  return (
    <>
      {entriesSliced.map((entry, idx) => (
        <Entry key={offset + idx} entry={entry} index={offset + idx} />
      ))}
    </>
  );
}
