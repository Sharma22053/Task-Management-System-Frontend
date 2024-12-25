import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CategoryService } from './category.service';
import { Category, CategoryProjection } from '../../models/category.model';
 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CategoryService]
})
export class CategoryComponent {
  categories: CategoryProjection[] = [];
  currentAction: string = ''; // track current action (create, update, delete)
  successMessage: string = ''; // for success messages
  errorMessage: string = ''; // for error messages
  categoryTaskCount: any[] = [];  // Now an array of entries (key-value pairs)
  selectedCategory: Category = { categoryId: 0, categoryName: '' };
  newCategory: Category = { categoryId: 0, categoryName: '' }; // Initialized with 0
  isEditing = false;  // Flag to manage editing state
  isSidebarCollapsed = false;
 
  constructor(private categoryService: CategoryService) {}
 
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
 
  loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      if (data && data.length > 0) {
        this.categories = data;
      } else {
        alert('No categories found.');
      }
    }, error => {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories.');
    });
  }
 
  loadCategoryById(): void {
    if (!this.newCategory.categoryId) {
      alert('Please enter a valid Category ID.');
      return;
    }
   
    this.categoryService.getCategoryById(this.newCategory.categoryId).subscribe({
      next: (data) => {
        console.log('Category fetched by ID:', data);
        this.categories = [data];
        this.currentAction = 'getById';
      },
      error: (err) => {
        console.error('Error fetching category by ID:', err);
        alert('Failed to fetch the category. Please check the ID and try again.');
      }
    });
  }
 
  loadCategoryTaskCounts(): void {
    this.categoryService.getCategoriesWithTaskCount().subscribe((data) => {
      console.log('Category Task Count:', data);
      // Convert the Map to an array of key-value pairs
      this.categoryTaskCount = Array.from(Object.entries(data));
    }, error => {
      console.error('Error fetching category task counts:', error);
      alert('Failed to load category task counts.');
    });
  }
 
  addCategory(): void {
    if (!this.newCategory.categoryName) {
      alert('Please enter a valid Category Name.');
      return;
    }
 
    this.categoryService.createCategory(this.newCategory).subscribe((response) => {
      console.log(response);
      this.loadAllCategories();
      this.newCategory = { categoryId: 0, categoryName: '' }; // Reset to default values
      alert('Category created successfully.');
    }, error => {
      console.error('Error creating category:', error);
      alert('Failed to create the category. Please try again.');
    });
  }
 
  editCategory(category: Category): void {
    this.selectedCategory = { ...category };
    this.isEditing = true;  // Set the flag to allow editing of the categoryId
    this.newCategory = { categoryId: category.categoryId, categoryName: category.categoryName };
    this.currentAction = 'update'; // Trigger update action
  }
 
  updateCategory(): void {
    if (!this.newCategory.categoryId || !this.newCategory.categoryName) {
      alert('Please provide both a valid Category ID and Category Name.');
      return;
    }
 
    this.categoryService
      .updateCategory(this.newCategory.categoryId, { categoryName: this.newCategory.categoryName })
      .subscribe({
        next: (response) => {
          console.log('Category updated successfully:', response);
          this.loadAllCategories();
          this.newCategory = { categoryId: 0, categoryName: '' }; // Reset to default values
          alert('Category updated successfully.');
        },
        error: (err) => {
          console.error('Error updating category:', err);
          alert('Failed to update the category. Please try again.');
        }
      });
  }
 
  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe((response) => {
      console.log(response);
      this.loadAllCategories();
      alert('Category deleted successfully.');
    });
  }
 
  onCategoryIdInput(event: any): void {
    const value = event.target.value;
    if (value && !isNaN(value)) {
      this.newCategory.categoryId = +value;  // Convert the value to a number
    } else {
      this.newCategory.categoryId = 0;  // Reset to 0 if the input is invalid
    }
  }
 
  showForm(action: string): void {
    this.currentAction = action;
    this.newCategory = { categoryId: 0, categoryName: '' }; // Reset the category form
    this.categories = [];
    this.categoryTaskCount = [];
 
    if (action === 'getAll') {
      this.loadAllCategories();
    } else if (action === 'getTaskCount') {
      this.loadCategoryTaskCounts();
    }
  }
}
 
 