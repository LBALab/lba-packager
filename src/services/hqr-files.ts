import { HQR } from '@lbalab/hqr';
import saveAs from 'file-saver';
import { HQRInfo } from '../types';
import { getMetadataForHQR } from './metadata';

export async function showOpenHQRFileDialog(): Promise<HQRInfo | null> {
  let buffer: ArrayBuffer | null = null;
  let filename = '<?>';
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.hqr, .vox, .ile, .obl';
  input.click();
  const file = await new Promise<File>(resolve => {
    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      resolve(files[0]);
    };
  });
  buffer = await file.arrayBuffer();
  filename = file.name;
  if (buffer) {
    const hqr = HQR.fromArrayBuffer(buffer);
    const metadata = await getMetadataForHQR(filename, hqr);
    return { hqr, filename, metadata };
  }
  return null;
}

export function saveHQR(hqrInfo: HQRInfo) {
  const buffer = hqrInfo.hqr.toArrayBuffer();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, hqrInfo.filename);
}
