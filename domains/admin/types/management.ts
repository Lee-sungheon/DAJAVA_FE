export interface ISolutionData {
  email: string;
  applicationDate: string;
  startDate: string;
  endDate: string;
  domain: string;
  solutionStatus: 'Pending' | 'Complete';
  progressStatus: 'Rejected' | 'In Progress' | 'Complete';
}

export type TStatusType = 'Pending' | 'Complete' | 'Rejected' | 'In Progress';
