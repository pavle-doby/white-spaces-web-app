import { Component, OnInit, Input } from '@angular/core';

const STATUS_MAP = {
  0: { text: 'Not Accepted', class: 'status-table__red' },
  1: { text: 'In Progress', class: 'status-table__yellow' },
  2: { text: 'Finished', class: 'status-table__green' },
};

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.scss'],
})
export class StatusTableComponent implements OnInit {
  @Input() statusId: number;
  public text: string;
  public class: string;
  constructor() {}

  ngOnInit(): void {
    this.text = STATUS_MAP[this.statusId].text;
    this.class = STATUS_MAP[this.statusId].class;
  }
}
