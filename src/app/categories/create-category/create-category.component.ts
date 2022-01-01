import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/Category.model';
import Swal from 'sweetalert2';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup | any
  category: Category
  allCategories: Category[]

  constructor(private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService) { this.category = {id: 0, name: ''}, this.allCategories = [{id: 0, name: ''}]}

  ngOnInit(): void {
    this.initForm()
    this.getAllCategory()
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getCategory() {
    const name = this.categoryForm?.get('name')?.value;
    this.category = new Category()
    this.category.name = name

    this.categoryService.createCategory(this.category).subscribe(data => {
      console.log(data)
      window.location.reload()
    },
    error => {
      console.log(error)
      Swal.fire('Catégorie', error, 'error');
    })
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(data => {
      console.log(data)
      this.allCategories = data
    },
    error => {
      console.log(error)
    })
  }

  deleteCategory(id: any) {
    this.categoryService.delete(id).subscribe(data => {
      console.log(data)
      // Swal.fire('Catégorie', 'La categorie a bien été supprimé', 'error');
      window.location.reload()
    },
    error => {
      console.log(error)
    })
  }

}
