import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';

export const throttle = <Params extends unknown[]>(
  callback: (...args: Params) => unknown,
  delayMs: number,
) => {
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

interface IMouseEventData {
  type: 'mousemove' | 'touchmove' | 'click';
  timestamp: number;
  clientX: number;
  clientY: number;
}

interface IScrollEventData {
  type: 'scroll';
  timestamp: number;
  scrollX: number;
  scrollY: number;
}

export class UserEventRecorder {
  private isRecording: boolean = false;
  private throttleDelay: number = 200;

  private handleMouseMove = throttle((e: PointerEvent) => {
    const eventData: IMouseEventData = {
      type: 'mousemove',
      timestamp: Date.now(),
      clientX: e.clientX,
      clientY: e.clientY,
    };
    console.log(eventData);
  }, this.throttleDelay);

  private handleTouchMove = throttle((e: TouchEvent) => {
    const eventData: IMouseEventData = {
      type: 'touchmove',
      timestamp: Date.now(),
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
    };
    console.log(eventData);
  }, this.throttleDelay);

  private handleClick = (e: MouseEvent) => {
    const eventData: IMouseEventData = {
      type: 'click',
      timestamp: Date.now(),
      clientX: e.clientX,
      clientY: e.clientY,
    };
    console.log(eventData);
  };

  private handleScroll = throttle(() => {
    const eventData: IScrollEventData = {
      type: 'scroll',
      timestamp: Date.now(),
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };
    console.log(eventData);
  }, this.throttleDelay);

  public startRecording() {
    if (this.isRecording) return;
    this.isRecording = true;

    setTimeout(async () => {
      domtoimage
        .toJpeg(document.body, { cacheBust: true })
        .then((image) => console.log(image));
      html2canvas(document.body, {
        allowTaint: false,
        useCORS: true,
        logging: false,
        scale: window.devicePixelRatio,
        backgroundColor: null,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg');
          console.log(imgData);
        })
        .catch((err) => {
          console.error('html2canvas 오류:', err);
        });
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
