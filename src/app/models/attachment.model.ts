
export interface Attachment {
  attachmentId: number;
  fileName: string;
  filePath: string;
  task: { taskId: number };  
}


export interface AttachmentProjection {
  attachmentId: number;
  fileName: string;
  filePath: string;
  taskId: number;
}
