import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit{
  constructor(private activateRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      this.activateRoute.params.subscribe(
        {
          next: (res) => console.log(res)
        }
      )

      this.activateRoute.queryParams.subscribe(
        {
          next: (res) => console.log(res)
        }
      )

      setInterval(() => {
        this.router.navigate(['404'])
        this.router.navigateByUrl('404')
      }, 5000)
  }


}
