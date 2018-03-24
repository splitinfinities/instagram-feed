/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */
declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


import {
  InstagramFeed as InstagramFeed
} from './components/instagram-feed/instagram-feed';

declare global {
  interface HTMLInstagramFeedElement extends InstagramFeed, HTMLStencilElement {
  }
  var HTMLInstagramFeedElement: {
    prototype: HTMLInstagramFeedElement;
    new (): HTMLInstagramFeedElement;
  };
  interface HTMLElementTagNameMap {
    'instagram-feed': HTMLInstagramFeedElement;
  }
  interface ElementTagNameMap {
    'instagram-feed': HTMLInstagramFeedElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'instagram-feed': JSXElements.InstagramFeedAttributes;
    }
  }
  namespace JSXElements {
    export interface InstagramFeedAttributes extends HTMLAttributes {
      'captions'?: boolean;
      'count'?: number;
      'even'?: boolean;
      'link'?: boolean;
      'token'?: string;
      'user'?: string;
      
    }
  }
}


import {
  SmartImage as SmartImage
} from './components/smart-image/smart-image';

declare global {
  interface HTMLSmartImageElement extends SmartImage, HTMLStencilElement {
  }
  var HTMLSmartImageElement: {
    prototype: HTMLSmartImageElement;
    new (): HTMLSmartImageElement;
  };
  interface HTMLElementTagNameMap {
    'smart-image': HTMLSmartImageElement;
  }
  interface ElementTagNameMap {
    'smart-image': HTMLSmartImageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'smart-image': JSXElements.SmartImageAttributes;
    }
  }
  namespace JSXElements {
    export interface SmartImageAttributes extends HTMLAttributes {
      'bg'?: string;
      'fill'?: boolean;
      'height'?: number;
      'preload'?: string;
      'square'?: boolean;
      'width'?: number;
      
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }