import html2canvas from 'html2canvas';

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
  type: 'mousemove' | 'click';
  timestamp: number;
  x: number;
  y: number;
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
  public screenshotDataUrl: string | null = null;

  private handleMouseMove = throttle((e: MouseEvent) => {
    const eventData: IMouseEventData = {
      type: 'mousemove',
      timestamp: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    console.log(eventData);
  }, this.throttleDelay);

  private handleClick = (e: MouseEvent) => {
    const eventData: IMouseEventData = {
      type: 'click',
      timestamp: Date.now(),
      x: e.clientX,
      y: e.clientY,
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

    html2canvas(document.body)
      .then((canvas) => {
        this.screenshotDataUrl = canvas.toDataURL('image/png');
        console.log('Screenshot captured:', this.screenshotDataUrl);
      })
      .catch((error) => {
        console.error('Screenshot capture failed:', error);
      });

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('scroll', this.handleScroll);
  }

  public stopRecording() {
    if (!this.isRecording) return;

    this.isRecording = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('scroll', this.handleScroll);
  }
}
