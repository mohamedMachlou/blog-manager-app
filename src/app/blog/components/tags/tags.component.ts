import { Component, OnInit, inject, signal } from '@angular/core';
import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  id = signal<number>(0)
  label = signal<string>('')
  index = signal<number>(-1)
  mode = signal<string>('')
  tags = signal<Tag[]>([])

  tagService = inject(TagService)

  ngOnInit(): void {
    this.getAlltags();
  }

  getAlltags(){
    this.tagService.getAll().subscribe((res) => this.tags.set(res))
  }
  createOrUpdate() {
    if(this.id()) {
      this.updatetag();
    }else{
      this.createNewtag();
    }
  }

  createNewtag() {
    const tag: Tag = {
      label: this.label(),
    };
    this.tagService.persist(tag).subscribe((res)=> {
      console.log(res)
      this.label.set('')
      this.getAlltags();
    });

  }
  
  updatetag() {
    this.mode.set("update")
    const data: Tag = {
      id: this.id(),
      label: this.label(),
    }
    this.tagService.update(this.id(), data).subscribe((res)=> {
      console.log(res)
      this.label.set('')
      this.getAlltags();
    });
  }

  edit(tag : Tag) {
    this.mode.set("edit")
    let {id, label} = tag 
    if(id) {
      this.id.set(id)
    }
    this.label.set(label)
    console.log(tag)
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
        this.tagService.delete(this.id()).subscribe((res) => {
          this.tags.update(tag => tag.filter(tag => tag.id !== id))
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
