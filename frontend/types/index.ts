export type TImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

export type TSummary = {
  documentId: string;
  videoId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};