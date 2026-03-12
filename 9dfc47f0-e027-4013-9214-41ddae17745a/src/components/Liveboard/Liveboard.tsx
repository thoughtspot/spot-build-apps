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
      hideLiveboardHeader={true}
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
                'display': 'none !important',
              },
              'div[data-testid="conv-assist-send-btn"]': {
                'background-color': 'var(--ts-var-button--secondary-background) !important',
              },
              'div[data-testid="conv-assist-send-btn"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
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
              'button[data-testid="modal-confirm-button"]': {
                'background-color': 'var(--ts-var-button--secondary-background) !important',
              },
              'button[data-testid="modal-confirm-button"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="ask-ai"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="answer-header-menu-button"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="worksheet-action-menu-btn"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="expand-btn"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="conv-assist-reset-chat-btn"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="modal-dismiss-button"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              'button[data-testid="edit-columns-btn"]:hover': {
                'background-color': 'var(--ts-var-button--secondary-hover-background) !important',
              },
              '.ag-cell': {
                'color': 'var(--ts-var-viz-title-color, #1D232F) !important',
              },
              '.ag-cell:hover': {
                'color': 'inherit !important',
              },
              '.ag-header-cell-text': {
                'color': 'var(--ts-var-viz-title-color, #1D232F) !important',
              },
              '.table-viz-module__colHeaderText': {
                'color': 'var(--ts-var-viz-title-color, #1D232F) !important',
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
