import { RouteObject } from "react-router";
import dynamic from "./utils/dynamic";

export const routes:RouteObject[] = [
  {
    path: '/',
    element: dynamic(() => import('./pages/editor')),
  },
  {
    path: '/preview',
    element: dynamic(() => import('./pages/preview')),
  },
];