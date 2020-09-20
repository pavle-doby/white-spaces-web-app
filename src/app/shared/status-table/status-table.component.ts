import { Component, OnInit, Input } from '@angular/core';

const STATUS_MAP = {
  'declined': { text: 'Not Accepted', class: 'status-table__red' },
  'approved': { text: 'In Progress', class: 'status-table__blue' },
  'completed': { text: 'Finished', class: 'status-table__green' },
  'new':{ text: 'New', class: 'status-table__yellow' }
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
