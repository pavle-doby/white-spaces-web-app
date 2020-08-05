import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Question } from 'src/models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input()
  public question: Question;

  @Output()
  public changeAnswerEvent: EventEmitter<Question>;

  public answer: string;

  constructor() {
    this.changeAnswerEvent = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.answer = this.question.answer;
  }

  public onFocusOut(): void {
    const newQuestion = {
      ...this.question,
      answer: this.answer,
      isAswerd: !!this.answer,
    };
    this.changeAnswerEvent.emit(newQuestion);
  }
}
