declare module 'react-player' {
  import * as React from 'react';
  export interface ReactPlayerProps {
    url?: string | string[];
    controls?: boolean;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
} 