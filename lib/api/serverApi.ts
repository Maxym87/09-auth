import { User } from "@/types/user";
import type { Note, FetchNotesResponse } from "../../types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

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
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkServerSession = async (): Promise<boolean> => {
  try {
    const cookieStore = cookies();

    const response = await nextServer.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.status === 200;
  } catch {
    return false;
  }
};
