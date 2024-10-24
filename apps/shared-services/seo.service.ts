import { DOCUMENT, Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public isBot: boolean;
  private isBotLegacy: boolean;
  private host: string;

  constructor(
    private meta: Meta,
    private title: Title,
    private location: Location,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: any,
  ) {
    // using native js because angular's route takes somewhere between 100-200ms to initialize and get the query param
    const url = new URL(window.location.href);
    this.host = window.location.hostname;
    this.isBotLegacy = url.searchParams.get('bot') === 'true';
    if (this.isBotLegacy || ['test.commudle.com'].includes(this.host)) {
      this.noIndex(true);
    }
    // TODO: don't remove above code since we need to no-index the existing bot pages
    // check if cookie is set (x-prerender: 1)
    this.isBot = this.cookieService.get('x-prerender') === '1';
  }

  setCanonical() {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.document.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.document.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    this.location.onUrlChange((url, state) => {
      element.setAttribute('href', `${environment.app_url}${url}`);
    });
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setTag(tag: string, content: string) {
    if (this.meta.getTag(`name="${tag}"`)) {
      this.meta.updateTag({ name: tag, property: tag, content: content });
    } else {
      this.meta.addTag({ name: tag, property: tag, content: content });
    }
  }

  removeTag(tag: string) {
    this.meta.removeTag(`name="${tag}"`);
  }

  setTags(title: string, description: string, image: string, contentType = 'website') {
    this.setTitle(title);
    this.setTag('description', description);
    this.setTag('image', image);
    this.setTag('og:title', title);
    this.setTag('og:description', description);
    this.setTag('og:image', image);
    this.setTag('og:image:secure_url', image);
    this.setTag('twitter:title', title);
    this.setTag('twitter:description', description);
    this.setTag('twitter:image', image);
    this.setTag('og:type', contentType);
  }

  noIndex(value: boolean) {
    if (value) {
      this.setTag('robots', 'noindex');
    } else if (!['test.commudle.com'].includes(this.host)) {
      this.removeTag('robots');
    }
  }

  setSchema(schema: Record<string, any>, className = 'structured-data') {
    if (this.isBot) {
      let script;
      // let shouldAppend = false;
      // append only if schema doesn't already exist
      // if (this.document.head.getElementsByClassName(className).length) {
      //   script = this.document.head.getElementsByClassName(className)[0];
      // } else {
      //   shouldAppend = true;
      // }
      script = this.document.createElement('script');
      script.setAttribute('class', className);
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }

  removeSchema(): void {
    if (this.isBot) {
      const els = [];
      ['structured-data', 'structured-data-org'].forEach((c) => {
        els.push(...Array.from(this.document.head.getElementsByClassName(c)));
      });
      els.forEach((el) => this.document.head.removeChild(el));
    }
  }
}
