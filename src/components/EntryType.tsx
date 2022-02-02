import React from 'react';
import { Tooltip, Link } from '@mui/material';
import {
  Image as ImageIcon,
  ViewInAr,
  Palette,
  FontDownload,
  DataArray,
  DataObject,
  QuestionMark,
  Animation,
  Foundation,
  Apartment,
  Landscape,
  MusicNote,
  CropOriginal,
  ViewComfy,
  Textsms,
} from '@mui/icons-material';
import { DataTypes, EntryMetadata } from '../services/metadata';
import { TypeCaption } from './style/styled-components';

interface Props {
  metadata?: EntryMetadata;
  dataTypes: DataTypes | null;
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'unknown':
      return <QuestionMark fontSize="small" color="error" />;
    case 'image':
      return <ImageIcon fontSize="small" color="primary" />;
    case 'palette':
      return <Palette fontSize="small" color="primary" />;
    case 'font':
      return <FontDownload fontSize="small" color="primary" />;
    case 'mesh':
      return <ViewInAr fontSize="small" color="primary" />;
    case 'sprite':
    case 'raw_sprite':
      return <ViewComfy fontSize="small" color="primary" />;
    case 'animation':
      return <Animation fontSize="small" color="primary" />;
    case 'iso_layout_library':
      return <Foundation fontSize="small" color="primary" />;
    case 'brick':
      return <Apartment fontSize="small" color="primary" />;
    case 'iso_scenery':
    case 'iso_scenery_fragment':
      return <Landscape fontSize="small" color="primary" />;
    case 'creative_labs_audio':
      return <MusicNote fontSize="small" color="primary" />;
    case 'scene':
      return <CropOriginal fontSize="small" color="primary" />;
    case 'dialogs':
      return <Textsms fontSize="small" color="primary" />;
    case 'sprite_actors':
    case 'entities_info':
    case 'dialogs_index':
      return <DataArray fontSize="small" color="primary" />;
    default:
      return <DataObject fontSize="small" color="primary" />;
  }
}

export default function EntryType({ metadata, dataTypes }: Props) {
  const type = metadata?.type || 'unknown';
  const caption =
    metadata?.game === 'LBA1' || metadata?.game === 'LBA2'
      ? {
          text: metadata.game.substring(3),
          tooltip: `${metadata?.game} ${type} type`,
        }
      : null;
  const typeInfo =
    dataTypes && metadata && metadata.game in dataTypes
      ? dataTypes[metadata.game][metadata.type]
      : null;
  return (
    <Link
      href={typeInfo?.documentation[0]}
      target="_blank"
      underline="hover"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TypeIcon type={type} />
      &nbsp;
      {type}
      {caption && (
        <>
          &nbsp;
          <Tooltip title={caption.tooltip}>
            <TypeCaption variant="caption">{caption.text}</TypeCaption>
          </Tooltip>
        </>
      )}
    </Link>
  );
}
