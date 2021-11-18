import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/core/model/review';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Review>();

  review!: Review;
  visible = false;
  constructor() { }

  ngOnInit() { }

  setForm(review: Review) {
    this.review = {
      Id: review.Id,
      Content: review.Content,
      Star: review.Star,
      Status: review.Status,
    };
  }

  close() {
    this.visible = false;
  }

  submit() {
    this.onSubmit.emit(this.review);
  }
}
