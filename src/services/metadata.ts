import { HQR } from '@lbalab/hqr';

export interface EntryMetadata {
  type: string;
  game: 'BOTH' | 'LBA1' | 'LBA2';
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
    try {
      const lba1Metadata = (await lba1.json()) as Metadata;
      if (lba1Metadata.entries.length === hqr.entries.length) {
        return lba1Metadata;
      }
    } catch (e) {
      // ignore
    }
  }

  if (lba2.status < 400) {
    try {
      const lba2Metadata = (await lba2.json()) as Metadata;
      if (lba2Metadata.entries.length === hqr.entries.length) {
        return lba2Metadata;
      }
    } catch (e) {
      // ignore
    }
  }
  return undefined;
}

interface DataTypesEntry {
  extension: string;
  documentation: string[];
}

export interface DataTypes {
  BOTH: Record<string, DataTypesEntry>;
  LBA1: Record<string, DataTypesEntry>;
  LBA2: Record<string, DataTypesEntry>;
}

export async function getDataTypes(): Promise<DataTypes> {
  const dataTypes: DataTypes = await fetch(`${BASE_URL}/data_types.json`).then(
    res => res.json()
  );
  return dataTypes;
}
