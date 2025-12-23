import React from 'react';
import { Action, LiveboardEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

interface LiveboardProps {
  liveboardId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorSchema: any;
}

const Liveboard: React.FC<LiveboardProps> = ({ liveboardId, colorSchema }) => {
  const ref = useEmbedRef<typeof LiveboardEmbed>();
  return (
    <LiveboardEmbed
      liveboardId={liveboardId}
      // hideLiveboardHeader
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
        Action.Share,
        Action.AddToFavorites,
        Action.AIHighlights,
        Action.MakeACopy,
        Action.DownloadAsPdf,
        Action.TML,
        Action.Present,
        Action.Schedule,
        Action.ExportTML,
        Action.SchedulesList,
        Action.LiveboardInfo,
        Action.RequestVerification,
        Action.RequestAccess,
      ]}
      isLiveboardStylingAndGroupingEnabled={true}
      ref={ref}
      style={{
        width: '100%',
        flex: 1,
      }}
      customizations={{
        style: {
          customCSS: {
            variables: colorSchema || {},
          },
        },
      }}
    />
  );
};

export default Liveboard;
