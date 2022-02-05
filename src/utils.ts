import { HQREntry } from '@lbalab/hqr';

export function humanFileSize(bytes: number, dp = 1): string {
  if (bytes === -1) {
    return 'N/A';
  }
  const thresh = 1000;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} bytes`;
  }

  const units = ['KB', 'MB', 'GB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return `${bytes.toFixed(dp)} ${units[u]}`;
}

export function compressionRatio(entry: HQREntry): string {
  if (entry.metadata.compressedSize && entry.metadata.originalSize) {
    const ratio = entry.metadata.compressedSize / entry.metadata.originalSize;
    return `${Math.round(ratio * 100)}% of original size`;
  }
  return 'N/A';
}
