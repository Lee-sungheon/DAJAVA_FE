import { domToJpeg } from 'modern-screenshot';
import { v4 as uuidv4 } from 'uuid';

import { getCachedBase64, post, throttle } from './feature';

interface IMouseEventData {
  eventId: string;
  sessionId: string;
  pageUrl: string;
  memberSerialNumber: string;
  timestamp: number;
  browserWidth: number;
  clientX: number;
  clientY: number;
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
}

interface IClickEventData {
  eventId: string;
  sessionId: string;
  pageUrl: string;
  memberSerialNumber: string;
  timestamp: number;
  browserWidth: number;
  clientX: number;
  clientY: number;
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
  tag: string;
}

interface IScrollEventData {
  eventId: string;
  sessionId: string;
  pageUrl: string;
  memberSerialNumber: string;
  timestamp: number;
  browserWidth: number;
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
}

interface IUserEventRecorderConstructorParams {
  memberSerialNumber: string;
}

export class UserEventRecorder {
  private isRecording: boolean = false;
  private throttleDelay: number = 200;
  private sessionId: string;
  private memberSerialNumber: string;
  private lastUrl: string = '';
  private observer: MutationObserver | null = null;

  constructor(
    { memberSerialNumber }: IUserEventRecorderConstructorParams = {
      memberSerialNumber: '5_team_testSerial',
    },
  ) {
    this.sessionId = uuidv4();
    this.memberSerialNumber = memberSerialNumber;
  }

  private handleMouseMove = throttle((e: PointerEvent) => {
    const eventData: IMouseEventData = {
      eventId: uuidv4(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      memberSerialNumber: this.memberSerialNumber,
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.clientX,
      clientY: e.clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    };

    post('/v1/logs/movement', eventData).catch((error) => {
      console.error('Failed to send movement data:', error);
    });
  }, this.throttleDelay);

  private handleTouchMove = throttle((e: TouchEvent) => {
    const eventData: IMouseEventData = {
      eventId: uuidv4(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      memberSerialNumber: this.memberSerialNumber,
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    };

    post('/v1/logs/movement', eventData).catch((error) => {
      console.error('Failed to send movement data:', error);
    });
  }, this.throttleDelay);

  private handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const eventData: IClickEventData = {
      eventId: uuidv4(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      memberSerialNumber: this.memberSerialNumber,
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.clientX,
      clientY: e.clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      tag: `${target.tagName.toLowerCase()}${target.id ? ` #${target.id}` : ''}${target.className ? ` .${target.className}` : ''}`,
    };

    post('/v1/logs/click', eventData).catch((error) => {
      console.error('Failed to send click data:', error);
    });
  };
  private handleScroll = throttle(() => {
    const eventData: IScrollEventData = {
      eventId: uuidv4(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      memberSerialNumber: this.memberSerialNumber,
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    };

    post('/v1/logs/scroll', eventData).catch((error) => {
      console.error('Failed to send scroll data:', error);
    });
  }, this.throttleDelay);

  public startRecording() {
    if (this.isRecording) return;
    this.isRecording = true;

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const currentUrl = window.location.href;
          if (currentUrl !== this.lastUrl) {
            this.lastUrl = currentUrl;
            this.captureScreenshot();
          }
        }
      });
    });

    this.observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('pointermove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
  }

  private captureScreenshot() {
    setTimeout(async () => {
      const images = Array.from(document.querySelectorAll('img'));

      const imgPromises = images.map(async (img) => {
        const imageUrl = img.getAttribute('data-src') || img.src;

        if (!imageUrl || !imageUrl.includes('https') || imageUrl.includes('localhost')) {
          return;
        }

        try {
          if (img.getAttribute('data-src')) {
            img.setAttribute('data-src', await getCachedBase64(imageUrl));
          } else {
            img.src = await getCachedBase64(imageUrl);
          }
        } catch (error) {
          console.log(error);
          return;
        }
      });

      const elements = Array.from(document.querySelectorAll<HTMLElement>('*'));

      const bgPromises = elements.map(async (el) => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;

        if (!bgImage || bgImage === 'none') {
          return;
        }

        const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          const imageUrl = urlMatch[1];

          try {
            const base64Url = await getCachedBase64(imageUrl);
            el.style.backgroundImage = `url('${base64Url}')`;
          } catch (error) {
            console.error(error);
          }
        }
      });

      await Promise.all([...imgPromises, ...bgPromises]).catch(() => null);

      domToJpeg(document.body, {
        fetch: {
          requestInit: {
            mode: 'cors',
            cache: 'no-cache',
          },
          bypassingCache: true,
        },
        filter: (node) => {
          if (node.nodeName === 'IFRAME' || node.nodeName === 'NOSCRIPT') {
            return false;
          }
          return true;
        },
        backgroundColor: '#ffffff',
        quality: 1,
        style: {
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
        },
      })
        .then((res) => {
          const formData = new FormData();
          const blob = new Blob([res], { type: 'image/jpeg' });
          formData.append('imageFile', blob, `${this.memberSerialNumber}_screenshot.jpeg`);
          formData.append('serialNumber', this.memberSerialNumber);
          formData.append('pageUrl', window.location.href);

          post('/v1/register/page-capture', formData).catch((error) => {
            console.error('Failed to send screenshot:', error);
          });
        })
        .catch(() => null);
    }, 2000);
  }

  public stopRecording() {
    if (!this.isRecording) return;

    post(`/v1/logs/end/${this.sessionId}`, { sessionId: this.sessionId }).catch((error) => {
      console.error('Failed to send stop data:', error);
    });

    this.isRecording = false;
    document.removeEventListener('pointermove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('scroll', this.handleScroll);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
