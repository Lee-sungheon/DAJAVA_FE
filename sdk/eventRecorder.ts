import { domToJpeg } from 'modern-screenshot';

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

async function getCachedBase64(url: string) {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  } else {
    const promise = getBase64FromUrl(url);
    imageCache.set(url, promise);
    return promise;
  }
}

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
  timestamp: number;
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
  viewprotHeight: number;
}

export class UserEventRecorder {
  private isRecording: boolean = false;
  private throttleDelay: number = 200;

  private handleMouseMove = throttle((e: PointerEvent) => {
    const eventData: IMouseEventData = {
      eventId: '1',
      sessionId: '1',
      pageUrl: window.location.href,
      memberSerialNumber: '1',
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.clientX,
      clientY: e.clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
    };
    console.log('-mousemove-');
    console.log(eventData);
  }, this.throttleDelay);

  private handleTouchMove = throttle((e: TouchEvent) => {
    const eventData: IMouseEventData = {
      eventId: '1',
      sessionId: '1',
      pageUrl: window.location.href,
      memberSerialNumber: '1',
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
    };
    console.log('-touchmove-');
    console.log(eventData);
  }, this.throttleDelay);

  private handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const eventData: IClickEventData = {
      eventId: '1',
      sessionId: '1',
      pageUrl: window.location.href,
      memberSerialNumber: '1',
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      clientX: e.clientX,
      clientY: e.clientY,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      tag: `${target.tagName.toLowerCase()}${target.id ? ` #${target.id}` : ''}${target.className ? ` .${target.className}` : ''}`,
    };
    console.log('-click-');
    console.log(eventData);
  };

  private handleScroll = throttle(() => {
    const eventData: IScrollEventData = {
      eventId: '1',
      sessionId: '1',
      pageUrl: window.location.href,
      memberSerialNumber: '1',
      timestamp: Date.now(),
      browserWidth: window.innerWidth,
      scrollY: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      viewprotHeight: window.innerHeight,
    };
    console.log('-scroll-');
    console.log(eventData);
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
      }).then((res) => console.log(res));
    }, 2000);

    document.addEventListener('pointermove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
  }

  public stopRecording() {
    if (!this.isRecording) return;

    this.isRecording = false;
    document.removeEventListener('pointermove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('scroll', this.handleScroll);
  }
}
