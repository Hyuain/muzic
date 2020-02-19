declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface IBannerItem {
  imageUrl: string
}

interface IRecommendItem {
  id: number
  picUrl: string
  playCount: number
  name: string
}

interface ISingerItem {
  picUrl: string
  name: string
  accountId: number
}