import { HQR } from '@lbalab/hqr';

export interface EntryMetadata {
  type: string;
  game: string;
  description: string;
}

export interface Metadata {
  description: string;
  entries: EntryMetadata[];
}

const BASE_URL = 'https://raw.githubusercontent.com/LBALab/metadata/main/';

export async function getMetadataForHQR(
  filename: string,
  hqr: HQR
): Promise<Metadata | undefined> {
  const [lba1, lba2] = await Promise.all([
    fetch(`${BASE_URL}/LBA1/HQR/${filename}.json`),
    fetch(`${BASE_URL}/LBA2/HQR/${filename}.json`),
  ]);
  if (lba1.status < 400) {
    const lba1Metadata = (await lba1.json()) as Metadata;
    if (lba1Metadata.entries.length === hqr.entries.length) {
      return lba1Metadata;
    }
  }

  if (lba2.status < 400) {
    const lba2Metadata = (await lba2.json()) as Metadata;
    if (lba2Metadata.entries.length === hqr.entries.length) {
      return lba2Metadata;
    }
  }
  return undefined;
}
