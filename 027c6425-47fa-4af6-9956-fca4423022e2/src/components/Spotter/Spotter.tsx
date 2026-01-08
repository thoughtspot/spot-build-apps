import React, { useEffect } from 'react';
import {
  SpotterEmbed,
  type CustomisationsInterface,
  Action,
  EmbedEvent,
  useEmbedRef,
} from '@thoughtspot/visual-embed-sdk/react';

interface SpotterProps {
  modelId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorSchema: any;
}

const Spotter: React.FC<SpotterProps> = ({ modelId, colorSchema }) => {
  const ref = useEmbedRef<typeof SpotterEmbed>();

  useEffect(() => {
    console.log('[Spotter] Component mounted/updated:', {
      modelId,
      hasModelId: !!modelId,
      modelIdLength: modelId?.length,
      modelIdType: typeof modelId,
      colorSchemaKeys: colorSchema ? Object.keys(colorSchema) : [],
      hasRef: !!ref.current,
      timestamp: new Date().toISOString(),
    });
  }, [modelId, colorSchema]);

  useEffect(() => {
    const embedInstance = ref.current;
    if (embedInstance) {
      console.log('[Spotter] Embed instance available, setting up event listeners:', {
        hasRef: !!embedInstance,
        refType: typeof embedInstance,
        hasOnMethod: typeof embedInstance.on === 'function',
      });

      // Set up event listeners
      const handleLoad = () => {
        console.log('[Spotter] EmbedEvent.Load - Spotter loaded successfully');
      };

      const handleError = (error: unknown) => {
        console.error('[Spotter] EmbedEvent.Error - Spotter error:', error);
      };

      const handleInit = () => {
        console.log('[Spotter] EmbedEvent.Init - Spotter initialization started');
      };

      embedInstance.on(EmbedEvent.Load, handleLoad);
      embedInstance.on(EmbedEvent.Error, handleError);
      embedInstance.on(EmbedEvent.Init, handleInit);

      console.log('[Spotter] Event listeners registered');

      // Cleanup
      return () => {
        console.log('[Spotter] Cleaning up event listeners');
        embedInstance.off(EmbedEvent.Load, handleLoad);
        embedInstance.off(EmbedEvent.Error, handleError);
        embedInstance.off(EmbedEvent.Init, handleInit);
      };
    } else {
      console.log(
        '[Spotter] Embed instance not yet available, will set up listeners when available'
      );
    }
  }, [ref]);

  if (!modelId) {
    console.warn('[Spotter] No modelId provided, cannot render');
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

  console.log('[Spotter] Rendering SpotterEmbed with props:', {
    modelId,
    hasColorSchema: !!colorSchema,
    colorSchemaKeys: colorSchema ? Object.keys(colorSchema) : [],
    customizationsKeys: customizations ? Object.keys(customizations) : [],
  });

  return (
    <SpotterEmbed
      worksheetId={modelId}
      ref={ref}
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
