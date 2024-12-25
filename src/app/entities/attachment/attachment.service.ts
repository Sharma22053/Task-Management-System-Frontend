import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attachment, AttachmentProjection } from "../../models/attachment.model";
 
@Injectable({
  providedIn: "root"
})
export class AttachmentService {
  private static url: string = "http://localhost:8091/api/attachments";
 
  constructor(private httpClient: HttpClient) {}
 
  // Get the list of all attachments
  public getListOfAllAttachment(): Observable<AttachmentProjection[]> {
    return this.httpClient.get<AttachmentProjection[]>(`${AttachmentService.url}/all`);
  }
 
  // Upload a new attachment and return attachmentId in response
  public uploadNewAttachment(attachment: Attachment): Observable<{ attachmentId: number, message: string }> {
    return this.httpClient.post<{ attachmentId: number, message: string }>(
      `${AttachmentService.url}/post`,
      attachment
    );
  }
 
 
  // Get attachment by ID
  public getAttachmentById(attachmentId: number): Observable<AttachmentProjection> {
    return this.httpClient.get<AttachmentProjection>(`${AttachmentService.url}/${attachmentId}`);
  }
 
  // Update an attachment and return attachmentId and message
 public updateAttachmentDetails(attachment: Attachment): Observable<{ attachmentId: number; message: string }> {
  return this.httpClient.put<{ attachmentId: number; message: string }>(
    `${AttachmentService.url}/update/${attachment.attachmentId}`,
    attachment
  );
}
 
 
  // Delete attachment by ID
  public deleteAttachment(attachmentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${AttachmentService.url}/delete/${attachmentId}`);
  }
}
 
 