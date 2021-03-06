import { Component, Prop, State, Element } from '@stencil/core';
import lineClamp from 'line-clamp';

@Component({
  tag: 'instagram-feed',
  styleUrl: 'instagram-feed.css'
})
export class InstagramFeed {
  @Element() element: HTMLElement;

  @Prop() count: number = 8;
  @Prop() user: string;
  @Prop() even: boolean = false;
  @Prop() captions: boolean = false;
  @Prop() link: boolean = true;
  @Prop() permalinks: boolean = false;

  @Prop() token: string;

  @State() photos: Array<any>;

  componentWillLoad() {
    this.fetchItems();
  }

  componentDidLoad () {
    if (!this.even) {
      this.resizeAllGridItems();
      window.addEventListener("resize", () => { this.resizeAllGridItems() });
    }
  }

  componentDidUpdate () {
    if (!this.even) {
      setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 100)
    }
  }

  async resizeGridItem (item) {
    const grid = this.element.querySelector(".grid");
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  async resizeAllGridItems () {
    const allItems = this.element.querySelectorAll(".item");

    for (let x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }

    this.clampCaptions();
  }

  async clampCaptions () {
    const captions = this.element.querySelectorAll('.caption p');

    for (let i = 0; i < captions.length; ++i) {
      lineClamp(captions[i], 2)
    }
  }

  url () {
    return `https://api.instagram.com/v1/users/${this.user}/media/recent/?access_token=${this.token}&count=${this.count}`
  }

  async fetchItems() {
    const response = await fetch(this.url());
    const items = await response.json();
    localStorage.setItem(`instagram-feed-${this.count}-${this.user}`, JSON.stringify(items));

    this.photos = items.data;
  }

  renderCaptions (photo) {
    return (
      <div class="caption">
        <p>{photo.caption.text}</p>
      </div>
    )
  }

  renderPhoto(photo) {
    const Tag = this.permalinks ? "a" : "div";

    // @ts-ignore
    return (<Tag class="item" href={photo.link} target="_blank">
        <div class="content">
          <smart-image preload={photo.images.thumbnail.url} width={photo.images.standard_resolution.width} height={photo.images.standard_resolution.height} square={this.even} fill={this.even}>
            <source srcSet={photo.images.low_resolution.url}  media="(max-width: 600px)" />
            <source srcSet={photo.images.standard_resolution.url}  media="(min-width: 600px)" />
          </smart-image>
          {this.captions && photo.caption && this.renderCaptions(photo)}
        </div>
      </Tag>)
  }

  render() {
    return (
      <div>
        <div class={`grid ${this.even ? "even" : ""}`}>
           {this.photos && this.photos.map((photo) => {
             return this.renderPhoto(photo)
           })}
        </div>
        {this.link &&
          <div class="view-more">
            <a href={`https://instagram.com/${this.user}`}>View more on Instagram</a>
          </div>
        }
      </div>
    );
  }
}
