declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface ServerData {
  banners: any
  result: any
}

interface ServerResponse {
  data: ServerData
}