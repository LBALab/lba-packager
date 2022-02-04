import { HQREntryBase } from '@lbalab/hqr';
import { saveAs } from 'file-saver';
import { DataTypes, EntryMetadata } from './metadata';

export function saveEntry(
  filename: string,
  entry: HQREntryBase,
  index: number,
  metadata: EntryMetadata | undefined,
  dataTypes: DataTypes | null
) {
  const blob = new Blob([entry.content], { type: 'application/octet-stream' });
  const name = `${filename}_${index}`;
  let extension = 'dat';
  if (metadata && dataTypes) {
    extension = dataTypes[metadata.game][metadata.type].extension;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  saveAs(blob, `${name}.${extension}`);
}
