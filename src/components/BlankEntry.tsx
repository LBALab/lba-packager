import React from 'react';
import {
  EntryTableRow,
  BlankTableCell,
  TableCell,
} from './style/styled-components';
import { ViewerContext } from './Viewer';

interface Props {
  index: number;
}

export default function BlankEntry({ index }: Props) {
  const { hqrInfo } = React.useContext(ViewerContext);
  return (
    <EntryTableRow>
      <TableCell />
      <TableCell align="right">
        <b>{index}</b>&nbsp;
      </TableCell>
      <BlankTableCell align="center" colSpan={5}>
        Blank entry
      </BlankTableCell>
      <TableCell>{hqrInfo?.metadata?.entries[index]?.description}</TableCell>
      <TableCell />
    </EntryTableRow>
  );
}
