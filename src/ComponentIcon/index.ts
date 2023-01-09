import type { ComponentProps } from 'react';
import { Core } from './Core';
type IconProps = Omit<ComponentProps<typeof Core>, 'icon'>;

export * from './BrandsGithub';
export * from './SolidBishop';
export * from './SolidCircle';
export * from './SolidKing';
export * from './SolidKnight';
export * from './SolidPawn';
export * from './SolidQueen';
export * from './SolidRock';
export * from './SolidXMark';
export type { IconProps };
