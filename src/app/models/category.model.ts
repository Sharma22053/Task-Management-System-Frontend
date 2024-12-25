
export interface Category {
    categoryId: number;
    categoryName: string;
    tasks?: { taskId: number }[]; 
  }
  
  export interface CategoryProjection {
    categoryId: number;
    categoryName: string;
  }
  