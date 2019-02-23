import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookDetailService } from 'src/app/services/book-detail.service';
import { BookItem } from 'src/app/models/book-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  isbn: FormControl;
  isLoading =  false;
  isSearchedfirstTime: boolean;
  showError = false;
  errorMessage: String;
  bookDetail: BookItem;

  constructor(private bookService: BookDetailService) { }

  ngOnInit(): void {
    this.isSearchedfirstTime = false;
    this.isbn = new FormControl(null, [Validators.required, Validators.maxLength(13)]);
    this.formGroup = new FormGroup({
      isbn: this.isbn
    });
  }
  searchBookDetail() {
    if (!this.isbn.valid) {
      console.log('Enter a valid isbn');
      return;
    }
    if (!this.isSearchedfirstTime) {
      this.isSearchedfirstTime = true;
    }
    this.showError = false;
    this.isLoading = true;
    this.bookService.listBookDetail(this.isbn.value).subscribe(
      (val) => {
        this.isLoading = false;
        this.bookDetail = val;
        console.log('value ', val);
      }, (err) => {
        this.isLoading = false;
        this.showError = true;
        console.log('Error occured', err);
        if (err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Cors Error Occured';
        }
      });
  }

}
