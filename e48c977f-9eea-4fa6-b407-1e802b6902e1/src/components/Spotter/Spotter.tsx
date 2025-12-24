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
      hideSourceSelection
      customizations={customizations}
    />
  );
};

export default Spotter;
