import React from 'react';
import { Action, LiveboardEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

interface LiveboardProps {
  liveboardId: string;
}

const Liveboard: React.FC<LiveboardProps> = ({ liveboardId }) => {
  const ref = useEmbedRef<typeof LiveboardEmbed>();
  return (
    <LiveboardEmbed
      liveboardId={liveboardId}
      hideLiveboardHeader
      showAlerts={false}
      hiddenActions={[
        Action.Edit,
        Action.Pin,
        Action.RenameModalTitleDescription,
        Action.SyncToOtherApps,
        Action.SyncToSheets,
        Action.SyncToSlack,
        Action.SyncToTeams,
        Action.ManagePipelines,
        Action.CopyLink,
        Action.CreateMonitor,
      ]}
      isLiveboardStylingAndGroupingEnabled={true}
      ref={ref}
      style={{
        width: '100%',
        flex: 1,
      }}
    />
  );
};

export default Liveboard;
