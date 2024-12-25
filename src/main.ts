import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AttachmentComponent } from './app/entities/attachment/attachment.component';
import { UserComponent } from './app/entities/user/user.component';
import { CommentComponent } from './app/entities/comment/comment.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
