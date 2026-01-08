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
  React.useEffect(() => {
    console.log('[Spotter] Component rendered:', {
      modelId,
      hasModelId: !!modelId,
      modelIdLength: modelId?.length,
    });
  }, [modelId]);

  if (!modelId) {
    console.warn('[Spotter] No modelId provided');
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Model ID is missing</p>
        <pre>{JSON.stringify({ modelId }, null, 2)}</pre>
      </div>
    );
  }

  const customizations: CustomisationsInterface = {
    style: {
      customCSS: {
        rules_UNSTABLE: {
          '.authenticated-app-view-module__pageContent': {
            overflow: 'hidden !important',
          },
          '[data-testid="conv-assist-data-source-selection-btn"]': {
            'pointer-events': 'none !important',
            cursor: 'default !important',
          },
          'textarea[data-testid="conv-assist-chat-input"]': {
            'background-color': 'var(--ts-var-spotter-input-background) !important',
            color: 'var(--ts-var-viz-title-color, #1D232F) !important',
            'caret-color': 'var(--ts-var-viz-title-color, #1D232F) !important',
          },
          'div[data-testid="conv-assist-send-btn"]': {
            'background-color': 'var(--ts-var-button--secondary-background) !important',
          },
          'div[data-testid="conv-assist-send-btn"]:hover': {
            'background-color':
              'var(--ts-var-liveboard-chip--hover-background, #DBDFE7) !important',
          },
          '.highcharts-text-outline': {
            'stroke-width': '0 !important',
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
