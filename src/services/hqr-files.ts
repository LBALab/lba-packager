/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HQR } from '@lbalab/hqr';
import saveAs from 'file-saver';
import { HQRInfo } from '../types';
import { getMetadataForHQR } from './metadata';

const HQR_FILE_EXTENSIONS = ['.HQR', '.VOX', '.ILE', '.OBL'];

export async function showOpenHQRFileDialog(): Promise<HQRInfo | null> {
  let file: File | null = null;
  let fileHandle: FileSystemFileHandle | undefined;
  if (typeof window.showOpenFilePicker === 'function') {
    const pickerResult = await window.showOpenFilePicker({
      types: [
        {
          description: 'HQR Files',
          accept: {
            'hqr/*': HQR_FILE_EXTENSIONS,
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    fileHandle = pickerResult[0];
    file = await fileHandle.getFile();
  } else {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = HQR_FILE_EXTENSIONS.join(',');
    input.click();
    file = await new Promise<File>(resolve => {
      input.onchange = e => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        resolve(files[0]);
      };
    });
  }
  const buffer = await file.arrayBuffer();
  const filename = file.name;
  if (buffer) {
    const hqr = HQR.fromArrayBuffer(buffer);
    const metadata = await getMetadataForHQR(filename, hqr);
    return { hqr, filename, metadata, fileHandle };
  }
  return null;
}

export async function saveHQR(hqrInfo: HQRInfo, showPicker: boolean) {
  const buffer = hqrInfo.hqr.toArrayBuffer({ fastRecompile: true });
  if (hqrInfo.fileHandle) {
    let fileHandle = hqrInfo.fileHandle;
    if (showPicker) {
      fileHandle = await window.showSaveFilePicker({
        excludeAcceptAllOption: true,
        types: [
          {
            description: 'HQR Files',
            accept: {
              'hqr/*': HQR_FILE_EXTENSIONS,
            },
          },
        ],
      });
    }
    const writeable = await fileHandle.createWritable();
    await writeable.write(buffer);
    await writeable.close();
  } else {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, hqrInfo.filename);
  }
}
