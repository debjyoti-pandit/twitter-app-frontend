import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    // this.router.navigate(['me'], { relativeTo: this.route})
  }

}
