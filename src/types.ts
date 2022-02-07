import { HQR } from '@lbalab/hqr';
import { Metadata } from './services/metadata';

export interface HQRInfo {
  hqr: HQR;
  filename: string;
  metadata?: Metadata;
  fileHandle?: FileSystemFileHandle;
}
