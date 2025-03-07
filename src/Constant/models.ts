export type apiModel = {
  code: number;
  msg: string | null;
  data: any | null;
};

export type apiErrorModel = {
  status: number | null;
  timestamp: string | null;
  error: string | null;
};
