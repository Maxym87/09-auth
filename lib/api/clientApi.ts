import { LoginRequest, RegisterRequest } from "@/types/auth";
import type { Note, NewNote, FetchNotesResponse } from "../../types/note";

import { nextServer } from "./api";
import { UpdateUserRequest, User } from "@/types/user";

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

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

export const getMe = async () => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
};
