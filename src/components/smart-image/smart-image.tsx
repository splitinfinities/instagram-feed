import { Component, Prop, State, Element } from '@stencil/core';
import { updateStyles } from '../../helpers';

@Component({
  tag: 'smart-image',
  styleUrl: 'smart-image.scss',
  shadow: true
})

export class SmartImage {
  @Element() element: HTMLElement;
  @State() figure: HTMLElement;

  @Prop() preload: string;

  @Prop() width: number;
  @Prop() height: number;

  @Prop() fill: boolean = false;
  @Prop() square: boolean = false;

  @Prop() bg: string = "transparent";

  @State() aspectRatio: number;

  @State() orientation: string;

  @State() sources: Array<any> = [];

  @State() io: IntersectionObserver;
  @State() active: boolean = false;

  componentWillLoad() {
    this.setBG();
    this.prepareSources();
    this.updateAspectRatio();
    this.updateOrientation();
  }

  componentDidLoad() {
    this.addIntersectionObserver();

    this.figure = this.element.shadowRoot.querySelector('figure');
  }

  handleImage() {
    this.active = true;
  }

  addIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: any) => {
        if (data[0].isIntersecting) {
          this.handleImage();
          this.removeIntersectionObserver();
        }
      })

      this.io.observe(this.element.shadowRoot.querySelector('figure'));
    } else {
      setTimeout(() => {
        this.handleImage();
      }, 300);
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  setBG() {
    updateStyles(this.element, {
      "--bg": `${this.bg}`
    });
  }

  prepareSources() {
    const sources = this.element.querySelectorAll("source");

    let sourcesArray = [];

    [].forEach.call(sources, (source) => {
      sourcesArray = [...sourcesArray, source];
    });

    this.sources = sourcesArray;
  }

  updateAspectRatio() {
    this.aspectRatio = (this.height / this.width) * 100;

    if (this.square) {
      updateStyles(this.element, {
        "--aspect_ratio": `100%`,
        "--width": `${this.width}px`,
        "--height": `${this.width}px`,
      });
    } else {
      updateStyles(this.element, {
        "--aspect_ratio": `${this.aspectRatio}%`,
        "--width": `${this.width}px`,
        "--height": `${this.height}px`,
      });
    }
  }

  updateOrientation() {
      if (this.width > this.height) {
          this.orientation = 'landscape';
      } else if (this.width < this.height) {
          this.orientation = 'portrait';
      } else {
          this.orientation = 'even';
      }
  }

  renderPicture() {
    if (this.active) {
      this.figure.classList.add('loaded');

      return [
        this.sources.map((source) =>
          <source srcSet={source.srcset} media={source.media} />
        ),
        <img src={this.preload} class={`final_image ${this.orientation}`} />
      ]
    }
  }

  render() {
    console.log(this.aspectRatio);
    return (
      <figure itemtype="http://schema.org/ImageObject" data-fill={this.fill}>
        <div class="overlay"></div>
        <picture>
          { this.renderPicture() }
        </picture>
        <img src={this.preload} class={`placeholder ${this.orientation}`} />
      </figure>
    );
  }
}
