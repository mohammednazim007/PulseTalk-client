export interface Message {
  _id?: string;
  senderId: string | null;
  room: string;
  content: string;
  createdAt?: string;
}
