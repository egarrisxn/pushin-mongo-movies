export interface MovieData {
  _id: string;
  title: string;
  poster?: string;
  plot?: string;
  cast?: string[];
  year: number | null;
}

export type PipelineStage =
  | {
      $search: {
        index: string;
        text: {
          query: string;
          fuzzy: object;
          path: {
            wildcard: string;
          };
        };
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    };

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
