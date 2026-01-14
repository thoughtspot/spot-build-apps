import React, { useState, useCallback } from 'react';
import { Action, LiveboardEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

interface LiveboardProps {
  liveboardId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorSchema: any;
}

// Generic payload type from SDK; we’ll narrow by checking fields at runtime.
type MessagePayload = {
  type: string;
  status?: string;
  data?: any;
};

const hasActiveFilters = (payload: MessagePayload): boolean => {
  if (payload.type !== 'filterChanged') return false;

  // The SDK’s FilterChanged payload exposes current filters under data.filters [1]
  const filters = payload.data?.filters ?? [];
  return filters.some((f: any) => Array.isArray(f.values) && f.values.length > 0);
};

const Liveboard: React.FC<LiveboardProps> = ({ liveboardId, colorSchema }) => {
  const ref = useEmbedRef<typeof LiveboardEmbed>();
  const [showHeader, setShowHeader] = useState(false);

  const handleFilterChanged = useCallback((payload: MessagePayload) => {
    console.log('[Liveboard] FilterChanged payload:', payload);

    // Only act on final state if status is present
    if (payload.status && payload.status !== 'end') return;

    const anyActive = hasActiveFilters(payload);
    setShowHeader(anyActive);
  }, []);

  return (
    <LiveboardEmbed
      ref={ref}
      liveboardId={liveboardId}
      showAlerts={false}
      hideLiveboardHeader={!showHeader}
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
      // This is the key line: drive header visibility from actual Liveboard filters
      onFilterChanged={handleFilterChanged}
      style={{
        width: '100%',
        flex: 1,
      }}
      customizations={{
        style: {
          customCSS: {
            rules_UNSTABLE: {
              'textarea[data-testid="conv-assist-chat-input"]': {
                'background-color': 'var(--ts-var-spotter-input-background) !important',
                'color': 'var(--ts-var-viz-title-color, #1D232F) !important',
                'caret-color': 'var(--ts-var-viz-title-color, #1D232F) !important',
              },
              '.worksheet-selection-button-module__disabled': {
                'opacity': '1 !important',
              },
              '[data-testid="conv-assist-data-source-selection-btn"]': {
                'opacity': '1 !important',
              },
              'div[data-testid="conv-assist-send-btn"]': {
                'background-color': 'var(--ts-var-button--secondary-background) !important',
              },
              'div[data-testid="conv-assist-send-btn"]:hover': {
                'background-color': 'var(--ts-var-liveboard-chip--hover-background, #DBDFE7) !important',
              },
              'div[data-testid="conv-assist-send-btn"] svg': {
                'fill': '#000000 !important',
                'color': '#000000 !important',
              },
              'div[data-testid="kpi_herodata"]': {
                'color': 'var(--ts-var-viz-title-color) !important',
              },
              '.highcharts-text-outline': {
                'stroke-width': '0 !important',
              },
            },
            variables: colorSchema || {},
          },
        },
      }}
    />
  );
};

export default Liveboard;
