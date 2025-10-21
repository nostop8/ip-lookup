export interface IpInput {
  id: number;
  value: string;
  isLoading: boolean;
  error: string | null;
  result: IpResult | null;
}

export interface IpResult {
  country: string;
  timezone: string;
}

export interface ApiError {
  error: string;
}