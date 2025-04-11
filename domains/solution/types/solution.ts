export interface ISolution {
  gridSize: number;
  pageWidth: number;
  pageHeight: number;
  pageCapture: string;
  gridCells: Array<{
    gridX: number;
    gridY: number;
    count: number;
    intensity: number;
    width: number;
    height: number;
  }>;
  metadata: {
    maxCount: number;
    totalEvents: number;
    pageUrl: string;
    totalSessions: number;
    firstEventTime: string;
    lastEventTime: string;
  };
}
