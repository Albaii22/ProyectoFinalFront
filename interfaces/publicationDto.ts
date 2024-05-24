import { CommentsDto } from "./CommentsDto";

export interface PublicationsDTO {
  id: number;
  user_id: number;
  content: string;
  vote_count: number;
  timestamp: string;
  comments: CommentsDto[];
}
