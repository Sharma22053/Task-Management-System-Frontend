import { Component } from "@angular/core";
import { AttachmentService } from "./attachment.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AttachmentProjection, Attachment } from "../../models/attachment.model";
 
@Component({
  selector: "attachment-crud",
  templateUrl: "./attachment.component.html",
  styles: [
    // Your CSS styles
  ],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AttachmentService],
})
export class AttachmentComponent {
  attachment: Attachment = {
    attachmentId: 0,  // Default to 0 for upload action
    fileName: "",
    filePath: "",
    task: { taskId: 0 },
  };
 
  attachmentList: AttachmentProjection[] = [];
  message: string = "";
  selectedAction: string = "";
  isSidebarCollapsed: boolean = false;
 
  constructor(private attachmentService: AttachmentService) {}
 
  // Handle action selection from buttons
  selectAction(action: string): void {
    this.selectedAction = action;
    this.clearForm(); // Reset form when changing actions
    this.attachmentList = []; // Clear any existing data in the table
    this.message = "";
 
    if (action === 'getAll') {
      this.getListOfAllAttachments();
    }
  }
 
  // Form submission handler
  onFormSubmit(): void {
    switch (this.selectedAction) {
      case "create":
        this.uploadNewAttachment();
        break;
      case "update":
        this.updateAttachmentDetails();
        break;
      case "getById":
        this.getAttachmentById();
        break;
      case "delete":
        this.deleteAttachment();
        break;
      default:
        this.message = "Please select a valid action.";
    }
  }
 
  // Upload a new attachment
  private uploadNewAttachment(): void {
    this.message = '';
    this.attachmentService.uploadNewAttachment(this.attachment).subscribe({
      next: (response: { attachmentId: number; message: string }) => {
        this.message = response.message; // Display success or error message from backend
        this.attachment.attachmentId = response.attachmentId; // Set the returned attachmentId
        this.clearForm(); // Clear form after upload
      },
      error: (err) => {
        this.message = `Error uploading attachment: ${err.message}`;
      }
    });
  }
 
 
 
  // Update an existing attachment
  private updateAttachmentDetails(): void {
    this.message = '';
    if (!this.attachment.attachmentId) {
      this.message = "Attachment ID is required for update.";
      return;
    }
 
    // Call the service and handle the response
    this.attachmentService.updateAttachmentDetails(this.attachment).subscribe({
      next: (response: { attachmentId: number; message: string }) => {
        // The response now contains { attachmentId, message }
        this.message = response.message;
        this.clearForm();  // Optionally clear the form after update
      },
      error: (err) => {
        this.message = `Error updating attachment: ${err.message}`;
      },
    });
  }
 
 
 
  // Get a specific attachment by ID
  public getAttachmentById(): void {
    this.message = '';
    if (!this.attachment.attachmentId) {
      this.message = "Attachment ID is required.";
      return;
    }
 
    this.attachmentService.getAttachmentById(this.attachment.attachmentId).subscribe(
      (data) => {
        this.attachmentList = [data];
        this.message = "Attachment fetched successfully!";
      },
      (error) => {
        this.message = "Failed to fetch attachment: " + error.message;
      }
    );
  }
 
  // Delete an attachment
  public deleteAttachment(): void {
    this.message = '';
    if (!this.attachment.attachmentId) {
      this.message = "Attachment ID is required.";
      return;
    }
 
    this.attachmentService.deleteAttachment(this.attachment.attachmentId).subscribe(
      () => {
        this.clearForm();
        this.message = "Attachment deleted successfully!";
      },
      (error) => {
        this.message = "Failed to delete attachment: " + error.message;
      }
    );
  }
 
  // Fetch all attachments
  public getListOfAllAttachments(): void {
    this.message = '';
    this.attachmentService.getListOfAllAttachment().subscribe({
      next: (data) => {
        this.attachmentList = data;
        this.message = "All attachments fetched successfully!";
      },
      error: (err) => {
        this.message = `Error fetching attachments: ${err.message}`;
      },
    });
  }
 
  // Clear the form
  private clearForm(): void {
    this.attachment = {
      attachmentId: 0,  // Reset to 0 for new uploads
      fileName: "",
      filePath: "",
      task: { taskId: 0 },
    };
    this.attachmentList = []; // Clear the list of attachments as well
}
 
 
  // Disable submit button based on selected action
  public isSubmitDisabled(): boolean {
    if (this.selectedAction === "create" || this.selectedAction === "update") {
      return !this.attachment.fileName || !this.attachment.filePath || !this.attachment.task.taskId;
    }
    if (this.selectedAction === "getById" || this.selectedAction === "delete") {
      return !this.attachment.attachmentId;
    }
    return true;
  }
 
  // Toggle sidebar collapse state
  public toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
 
 