import { Component, computed, DestroyRef, inject, Input, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterLink, RouterOutlet],
})
export class UserTasksComponent implements OnInit{
  message = input.required<string>();
  userName = input.required<string>();

  // private usersService = inject(UsersService);

  // getting path variable using the input() function
  // userId = input.required<string>();
  // userName = computed(
  //   () => this.usersService.users
  //         .find((u) => u.id === this.userId())?.name
  // );

  // getting path variable using the @Input decorator
  // @Input({required: true}) userId!: string;
  // get getUserName(){
  //   return this.usersService.users
  //       .find((u) => u.id === this.userId)?.name;
  // }

  // get path variable using Observables
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // userName = '';
  
  // ngOnInit(): void {
  //   console.log(this.message());
  //   const subscription = this.activatedRoute.paramMap
  //         .subscribe((paraMap) => {
  //           const userId = paraMap.get('userId');
  //           this.userName = this.usersService.users
  //               .find((u) => u.id === userId)?.name || '';
  //         })
  // }

  private activatedRoute = inject(ActivatedRoute);
  
  ngOnInit(): void {
    this.activatedRoute.data
        .subscribe({
          next: data => {
              console.log(data);
          }
        });
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerStateSnapshot: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users
      .find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}