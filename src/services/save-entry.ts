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
  let content = entry.content;
  let extension = 'dat';
  if (metadata && dataTypes) {
    extension = dataTypes[metadata.game][metadata.type].extension;
    if (extension === 'wav') {
      // Patch .wav entries so they can be played on modern media players.
      content = new ArrayBuffer(entry.content.byteLength);
      const view = new Uint8Array(content);
      view.set(new Uint8Array(entry.content));
      view[0] = 0x52;
    }
  }
  const blob = new Blob([content], { type: 'application/octet-stream' });
  const name = `${filename}_${index}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  saveAs(blob, `${name}.${extension}`);
}
