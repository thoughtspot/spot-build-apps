import React from 'react';
import { SpotterEmbed, type CustomisationsInterface } from '@thoughtspot/visual-embed-sdk/react';

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
        height: 'calc(100vh - 60px - 96px)',
      }}
      customizations={customizations}
    />
  );
};

export default Spotter;
