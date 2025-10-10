import React from 'react';
import {
  SpotterEmbed,
  type CustomisationsInterface,
  Action,
} from '@thoughtspot/visual-embed-sdk/react';

interface SpotterProps {
  modelId: string;
}

const Spotter: React.FC<SpotterProps> = (props) => {
  const customizations: CustomisationsInterface = {
    style: {
      customCSS: {
        rules_UNSTABLE: {
          '.authenticated-app-view-module__pageContent': {
            overflow: 'hidden !important',
          },
        },
      },
    },
  };

  return (
    <SpotterEmbed
      worksheetId={props.modelId}
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
