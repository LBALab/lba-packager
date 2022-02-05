import { HQR, HQREntry, HQREntryBase } from '@lbalab/hqr';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { HQRInfo } from '../types';
import { DataTypes, EntryMetadata } from './metadata';

export function saveEntry(
  hqrFilename: string,
  entry: HQREntryBase,
  index: number,
  metadata: EntryMetadata | undefined,
  dataTypes: DataTypes | null
) {
  const [filename, blob] = getEntryBlob(
    hqrFilename,
    entry,
    index,
    metadata,
    dataTypes
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  saveAs(blob, filename);
}

export async function saveAllEntriesAsZip(
  hqrInfo: HQRInfo,
  dataTypes: DataTypes | null
) {
  const zip = new JSZip();
  for (let i = 0; i < hqrInfo.hqr.entries.length; i++) {
    const entry = hqrInfo.hqr.entries[i];
    if (entry) {
      const [filename, blob] = getEntryBlob(
        hqrInfo.filename,
        entry,
        i,
        hqrInfo.metadata?.entries[i],
        dataTypes
      );
      zip.file(filename, blob);
    }
  }
  const zippedData = await zip.generateAsync<'arraybuffer'>({
    compression: 'STORE',
    type: 'arraybuffer',
  });
  const blob = new Blob([zippedData], { type: 'application/zip' });
  saveAs(blob, `${hqrInfo.filename}.zip`);
}

function getEntryBlob(
  hqrFilename: string,
  entry: HQREntryBase,
  index: number,
  metadata: EntryMetadata | undefined,
  dataTypes: DataTypes | null
): [string, Blob] {
  let content = entry.content;
  let extension = 'dat';
  if (metadata && dataTypes) {
    extension = dataTypes[metadata.game][metadata.type].extension;
    // Patch .wav and .voc entries so they can be played on modern media players.
    if (extension === 'wav') {
      content = new ArrayBuffer(entry.content.byteLength);
      const view = new Uint8Array(content);
      view.set(new Uint8Array(entry.content));
      view[0] = 0x52;
    } else if (extension === 'voc') {
      content = new ArrayBuffer(entry.content.byteLength);
      const view = new Uint8Array(content);
      view.set(new Uint8Array(entry.content));
      view[0] = 0x43;
    }
  }
  const name = `${hqrFilename}_${index}`;
  return [
    `${name}.${extension}`,
    new Blob([content], { type: 'application/octet-stream' }),
  ];
}

export async function replaceEntry(hqr: HQR, index: number, subIndex?: number) {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();
  const file = await new Promise<File>(resolve => {
    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      resolve(files[0]);
    };
  });
  const existingEntry =
    subIndex !== undefined
      ? hqr.entries[index]?.hiddenEntries[subIndex]
      : hqr.entries[index];
  const buffer = await file.arrayBuffer();
  const newEntry = new HQREntry(
    buffer,
    existingEntry ? existingEntry.type : 1,
    {
      offset: existingEntry?.metadata.offset || -1,
      originalSize: buffer.byteLength,
      compressedSize: -1,
      replacement: file.name,
    }
  );
  if (subIndex !== undefined) {
    const parent = hqr.entries[index];
    if (parent) {
      parent.hiddenEntries[subIndex] = newEntry;
    }
  } else {
    hqr.entries[index] = newEntry;
  }
  return file.name;
}
