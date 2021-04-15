import { Component, OnInit, Input } from '@angular/core';
import { ISingleExternalFeed} from 'projects/shared-models/single-external-feed.model';
import * as moment from 'moment';

@Component({
  selector: 'app-external-feed-hlist-item',
  templateUrl: './external-feed-hlist-item.component.html',
  styleUrls: ['./external-feed-hlist-item.component.scss']
})
export class ExternalFeedHListItemComponent implements OnInit {
  moment = moment;

  @Input() feedPost;

  constructor() { }

  ngOnInit() {
  	console.log("Reaching Init");
	console.log(this.feedPost);    
  }
}