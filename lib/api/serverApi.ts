import type { Note, FetchNotesResponse } from "../../types/note";
import { nextServer } from "./api";

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params = {
    perPage: 12,
    page,
    tag,
    search,
  };

  if (search.trim() !== "") {
    params.search = search;
  }

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};
