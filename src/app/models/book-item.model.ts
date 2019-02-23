import { Author } from './author.model';

export interface BookItem {
  ISBN: String;
  title: String;
  languageCode: String;
  description: String;
  coverThumb: String;
  subjects: String[];
  authors: Author[];
}
