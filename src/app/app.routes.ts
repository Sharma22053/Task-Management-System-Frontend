import { Routes } from '@angular/router';
import { UserComponent } from './entities/user/user.component';
import { AttachmentComponent } from './entities/attachment/attachment.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './entities/notification/notification.component';
import { CommentComponent } from './entities/comment/comment.component';
import { ProjectComponent } from './entities/project/project.component';
import { TaskComponent } from './entities/task/task.component';
import { CategoryComponent } from './entities/category/category.component';
import { UserRoleComponent } from './entities/userrole/userrole.component';
import { UserRolesComponent } from './entities/userroles/userroles.component';
import { TaskCategoryComponent } from './entities/taskcategory/taskcategory.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './home/contact/contact.component';
import { EmployeeComponent } from './employee-dashboard/employee.component';



export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {component:UserComponent,path:'user'},
    {component:AttachmentComponent,path:'attachment'},
    {component:NotificationComponent,path:'notification'},
    {component:CommentComponent,path:'comment'},
    {component:ProjectComponent,path:'project'},
    {component:TaskComponent,path:'task'},
    {component:CategoryComponent,path:'category'},
    {component:UserRoleComponent,path:'userrole'},
    {component:HomeComponent,path:'home'},
    {component:UserRolesComponent,path:'userroles'},
    {component:TaskCategoryComponent,path:'taskcategory'},
    {component:LoginComponent,path:'login'},
    {component:ContactComponent,path:'contact'},
    {component:EmployeeComponent,path:'employee'},
    //{component:AdminComponent,path:'admin'}
     {component:AdminComponent,path:'admin',children:[
        {component:UserComponent,path:'user'},
    {component:AttachmentComponent,path:'attachment'},
    {component:NotificationComponent,path:'notification'},
    {component:CommentComponent,path:'comment'},
    {component:ProjectComponent,path:'project'},
    {component:TaskComponent,path:'task'},
    {component:CategoryComponent,path:'category'},
    {component:UserRoleComponent,path:'userrole'},
    {component:UserRolesComponent,path:'userroles'},
    {component:TaskCategoryComponent,path:'taskcategory'}
    ]
    }
    // {path:'**',component:NotFoundComponent} // this must last because path:'**' attract every route
];
