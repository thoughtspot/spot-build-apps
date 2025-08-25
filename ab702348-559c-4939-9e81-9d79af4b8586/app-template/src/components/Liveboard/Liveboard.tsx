import React from 'react';
import { LiveboardEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

interface LiveboardProps {
  liveboardId: string;
}

const Liveboard: React.FC<LiveboardProps> = ({ liveboardId }) => {
  const ref = useEmbedRef<typeof LiveboardEmbed>();
  return (
    <LiveboardEmbed
      liveboardId={liveboardId}
      hideLiveboardHeader
      ref={ref}
      style={{
        width: '100%',
        flex: 1,
      }}
    />
  );
};

export default Liveboard;
