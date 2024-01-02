import { Component, OnInit, inject, signal } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  id = signal<number>(0)
  label = signal<string>('')
  index = signal<number>(-1)
  mode = signal<string>('')
  categories = signal<Category[]>([])

  categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAll().subscribe((res) => this.categories.set(res))
  }
  createOrUpdate() {
    if(this.id()) {
      this.updateCategory();
    }else{
      this.createNewCategory();
    }
  }

  createNewCategory() {
    const category: Category = {
      label: this.label(),
    };
    this.categoryService.persist(category).subscribe((res)=> {
      console.log(res)
      this.label.set('')
      this.getAllCategories();
    });

  }
  
  updateCategory() {
    this.mode.set("update")
    const data: Category = {
      id: this.id(),
      label: this.label(),
    }
    this.categoryService.update(this.id(), data).subscribe((res)=> {
      console.log(res)
      this.label.set('')
      this.getAllCategories();
    });
  }

  edit(category : Category) {
    this.mode.set("edit")
    let {id, label} = category 
    if(id) {
      this.id.set(id)
    }
    this.label.set(label)
    console.log(category)
  }
  
  delete(id : number) {
    this.mode.set("delete")
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.id.set(id)
        this.categoryService.delete(this.id()).subscribe((res) => {
          this.categories.update(category => category.filter(category => category.id !== id))
        })
        this.id.set(0)

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });

  
  }

  selected(i : number) {
    this.mode.set("")
    this.index.set(i);
  }
  
  
}
