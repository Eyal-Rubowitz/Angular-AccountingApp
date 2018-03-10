import { Component, OnInit, NgModule } from '@angular/core';
import { Participant } from '../participant';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'member-info',
    templateUrl: './member-info.component.html',
    styleUrls: []
  })

  
  export class MemberInfoComponent {
    public member: Observable<Participant>;

    constructor(private memberService: MemberService, private route: ActivatedRoute){}
      ngOnInit(): void {
        var memberId = this.route.snapshot.paramMap.get('id');
        this.member = this.memberService.getMember(memberId);
    }
  }