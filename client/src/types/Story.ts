export interface Story {
    _id: string;
    title: string;
    type: string;
    content: string;
    author: string[];
    themeRoomId: string;
    prev: string[];
    next: string[];
    createdAt: string;
    updatedAt: string;
  }
  