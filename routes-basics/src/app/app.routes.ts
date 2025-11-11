import { CanDeactivate, CanMatchFn, RedirectCommand, ResolveFn, Router, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";

import { routes as userRoutes } from "./users/users.routes"
import { NotFoundComponent } from "./not-found/not-found.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { inject } from "@angular/core";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const resolveTitle: ResolveFn<string> = (
    activatedRoute,
    routerState
) => {
    return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
}

const dummyCanMatch: CanMatchFn = (
    route,
    segments
) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 1){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
 }


export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Task selected'
    },
    {
         path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        data: {
            message: 'Hello console'
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle,
        canMatch: [dummyCanMatch]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

