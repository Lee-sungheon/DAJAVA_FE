import { domToJpeg } from 'modern-screenshot';
import { v4 as uuidv4 } from 'uuid';

import { post } from '@dajava/utils/api';

const throttle = <Params extends unknown[]>(callback: (...args: Params) => unknown, delayMs: number) => {
  let timeoutId: NodeJS.Timeout | null;

  return (...args: Params) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback(...args);
        timeoutId = null;
      }, delayMs);
    }
  };
};

const imageCache = new Map();

const getCachedBase64 = async (url: string) => {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  } else {
    const promise = getBase64FromUrl(url);
    imageCache.set(url, promise);
    return promise;
  }
};

const getBase64FromUrl = async (url: string) => {
  const response = await fetch(`https://2z1dj6gdya.execute-api.ap-northeast-2.amazonaws.com/proxy?url=${url}`);
  const blob = await response.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(String(base64data));
    };
  });
};

interface IMouseEventData {
  eventId: string;
  sessionId: string;
  pageUrl: string;
  memberSerialNumber: string;
  timestamp: string;
  browserWidth: number;
  clientX: number;
  clientY: number;
  scrollY: number;
  scrollHeight: number;
  viewprotHeight: number;
}

interface IClickEventData {
  eventId: string;
  sessionId: string;
  pageUrl: string;
  memberSerialNumber: string;
  timestamp: string;
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
  timestamp: string;
  browserWidth: number;
  scrollY: number;
  scrollHeight: number;
  viewprotHeight: number;
}

interface IUserEventRecorderConstructorParams {
  memberSerialNumber: string;
}

export class UserEventRecorder {
  private isRecording: boolean = false;
  private throttleDelay: number = 200;
  private sessionId: string;
  private memberSerialNumber: string;

  constructor(
    { memberSerialNumber }: IUserEventRecorderConstructorParams = {
      memberSerialNumber: 'a07cb1fc-e5db-4578-89a6-34d7a31f9389',
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
      timestamp: new Date().toISOString(),
      browserWidth: window.innerWidth,
      clientX: e.clientX,
      clientY: e.clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
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
      timestamp: new Date().toISOString(),
      browserWidth: window.innerWidth,
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
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
      timestamp: new Date().toISOString(),
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
      timestamp: new Date().toISOString(),
      browserWidth: window.innerWidth,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
    };

    post('/v1/logs/scroll', eventData).catch((error) => {
      console.error('Failed to send scroll data:', error);
    });
  }, this.throttleDelay);

  public startRecording() {
    if (this.isRecording) return;
    this.isRecording = true;

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
      }).then((res) => {
        const formData = new FormData();
        const blob = new Blob([res], { type: 'image/jpeg' });
        formData.append('imageFile', blob, `${this.memberSerialNumber}_${this.sessionId}_screenshot.jpeg`);

        post(`/v1/register/${this.memberSerialNumber}/page-capture`, formData).catch((error) => {
          console.error('Failed to send screenshot:', error);
        });
      });
    }, 2000);

    document.addEventListener('pointermove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
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
  }
}
