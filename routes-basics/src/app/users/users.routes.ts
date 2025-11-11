import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { inject } from "@angular/core";





export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
            userTasks: resolveUserTasks
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]