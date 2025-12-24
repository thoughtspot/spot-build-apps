// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appConfig: any = {
  host: 'https://team3.thoughtspot.cloud',
  liveboardId: '22e79c21-eec4-40bf-997b-7454c6e3a2a5',
  appId: '$APP_ID',
  modelId: 'cd252e5c-b552-49a8-821d-3eadaa049cca',
  expires_at: Date.now() + 3600000, // 1 hour from now
  app_config: {
    menu_items: [
      {
        key: 'home',
        label: 'Home',
      },
      {
        key: 'liveboard',
        label: 'Analytics',
      },
      {
        key: 'spotter',
        label: 'AI Chat assistant',
      },
      {
        key: 'search',
        label: 'Search',
      },
      {
        key: 'data',
        label: 'Data',
      },
    ],
    color_schema: {
      '--ts-var-nav-color': '#e3f0fa',
      '--ts-var-root-color': '#1e40af',
      '--ts-var-menu-border': '#e0f2fe',
      '--ts-var-nav-background': '#2563eb',
      '--ts-var-viz-background': '#f2f8fd',
      '--ts-var-viz-box-shadow': '0 2px 8px 0 rgba(30,64,175,0.09)',
      '--ts-var-menu-background': '#f2f8fd',
      '--ts-var-menu-item-color': '#1e40af',
      '--ts-var-nav-hover-color': '#1e40af',
      '--ts-var-root-background': '#e3f0fa',
      '--ts-var-viz-title-color': '#1e40af',
      '--ts-var-viz-border-radius': '14px',
      '--ts-var-viz-description-color': '#2563eb',
      '--ts-var-viz-title-font-family': "'Inter', 'Segoe UI', Arial, sans-serif",
      '--ts-var-spotter-input-background': '#f2f8fd',
      '--ts-var-viz-title-text-transform': 'uppercase',
      '--ts-var-spotter-prompt-background': '#e0f2fe',
      '--ts-var-menu-item-hover-background': '#bae6fd',
      '--ts-var-menu-item-active-background': '#0ea5e9',
      '--ts-var-viz-description-font-family': "'Inter', 'Segoe UI', Arial, sans-serif",
      '--ts-var-viz-legend-hover-background': '#bae6fd',
      '--ts-var-button--secondary-background': '#0ea5e9',
      '--ts-var-viz-description-text-transform': 'none',
    },
  },
};

export default appConfig;
