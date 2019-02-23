import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ISBNApiService } from './isbn-api.service';
import { BookItem } from '../models/book-item.model';

@Injectable()
export class BookDetailService extends ISBNApiService {
  bookItem: BookItem;
  listBookDetail(isbn: String): Observable<BookItem> {
    return this.get<any>('isbn/' + isbn).pipe(map(res => {
      this.bookItem = {
        ISBN : res.ISBN,
        authors : res.Authors,
        coverThumb : res.CoverThumb,
        description : res.Description,
        languageCode : res.LanguageCode,
        subjects : res.Subjects,
        title : res.Title,
      };
      return this.bookItem;
    }));
  }
}
