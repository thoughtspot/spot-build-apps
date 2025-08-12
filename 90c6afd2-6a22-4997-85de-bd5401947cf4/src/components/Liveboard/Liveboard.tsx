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
      ref={ref}
      style={{
        width: '100%',
        height: 'calc(100vh - 60px - 96px)',
      }}
    />
  );
};

export default Liveboard;
