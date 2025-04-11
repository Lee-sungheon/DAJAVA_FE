export interface ISolution {
  gridSize: number;
  pageWidth: number;
  pageHeight: number;
  pageCapture: string;
  gridCells: IGredCell[];
  metadata: {
    maxCount: number;
    totalEvents: number;
    pageUrl: string;
    totalSessions: number;
    firstEventTime: string;
    lastEventTime: string;
  };
}

export interface IGredCell {
  gridX: number;
  gridY: number;
  count: number;
  intensity: number;
  width: number;
  height: number;
}
