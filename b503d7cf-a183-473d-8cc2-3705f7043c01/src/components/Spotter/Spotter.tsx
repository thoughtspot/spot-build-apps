import React from 'react';
import {
  SpotterEmbed,
  type CustomisationsInterface,
  Action,
} from '@thoughtspot/visual-embed-sdk/react';

interface SpotterProps {
  modelId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorSchema: any;
}

const Spotter: React.FC<SpotterProps> = ({ modelId, colorSchema }) => {
  const customizations: CustomisationsInterface = {
    style: {
      customCSS: {
        rules_UNSTABLE: {
          '.authenticated-app-view-module__pageContent': {
            overflow: 'hidden !important',
          },
          '[data-testid="conv-assist-data-source-selection-btn"]': {
            'display': 'none !important',
          },
          'textarea[data-testid="conv-assist-chat-input"]': {
            'background-color': 'var(--ts-var-spotter-input-background) !important',
            'color': 'var(--ts-var-viz-title-color, #1D232F) !important',
            'caret-color': 'var(--ts-var-viz-title-color, #1D232F) !important',
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
  };

  return (
    <SpotterEmbed
      worksheetId={modelId}
      style={{
        width: '100%',
        flex: 1,
      }}
      hiddenActions={[Action.Pin, Action.Download, Action.Save, Action.Edit]}
      customizations={customizations}
    />
  );
};

export default Spotter;
