import { HQR } from '@lbalab/hqr';

export interface HQRInfo {
  hqr: HQR;
  filename: string;
}

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
    return { hqr, filename };
  }
  return null;
}
