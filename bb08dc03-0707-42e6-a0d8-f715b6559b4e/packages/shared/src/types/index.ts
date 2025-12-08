// Shared types placeholder
// TODO: Add application type definitions

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface App {
  id: string;
  name: string;
  description: string;
  userId: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export interface StreamResponse {
  clientId?: string;
  message: string;
  type: string;
  progress?: number;
  stage?: {
    id: string;
    title: string;
    message: string;
  };
  step?: string;
  status?: 'pending' | 'completed' | 'failed';
  data?: {
    appTheme?: {
      colors: string[];
      logo: string;
      navItems: {
        key: string;
        label: string;
      }[];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    previewData?: Array<{ [key: string]: any }>;
  };
}
export interface GenerationRequest {
  prompt: string;
  screenshot?: File | null;
  sseClientId: string;
}
export type Intent = 'SHOW_COPY_EXAMPLE' | 'CREATE_NEW_APP' | null;
export interface GenerationResponse {
  appId: string;
  modelId: string;
  liveboardId: string;
  intent?: Intent;
  message: string;
  app_config: {
    color_schema: {
      [key: string]: string;
    };
    menu_items?: string[];
  };
  expires_at: string;
  host: string;
  logo?: string;
  instruction_number?: number;
}
export interface UpdateAppRequest {
  userRequest: string;
}
export interface UpdateAppResponse {
  success: boolean;
  userRequest: string;
  app_config: {
    color_schema: {
      [key: string]: string;
    };
  };
  instruction_number: number;
  message: string;
  requiresUserInput: boolean;
}

export interface ExampleAppsResponse {
  result: {
    published_url: string;
    asset_data: string;
  }[];
}

export interface InviteRequest {
  app_id: string;
  name: string;
  emails: string[];
  message: string;
}

export interface TrackEventRequest {
  eventName: string;
  properties: Record<string, unknown>;
}

// TODO: Add more type definitions as needed
