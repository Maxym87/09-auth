import { LoginRequest, RegisterRequest } from "@/types/auth";
import type { Note, NewNote, FetchNotesResponse } from "../../types/note";

import { nextServer } from "./api";
import { User } from "@/types/user";

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

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  await nextServer.post("/auth/logout");
};
