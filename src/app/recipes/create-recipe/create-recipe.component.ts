import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/Category.model';
import { Users } from 'src/app/_models/Users.model';
import { CategoryService } from 'src/app/_services/category.service';
import { UsersService } from 'src/app/_services/users.service';
import Swal from 'sweetalert2';
import { Recipe } from '../../_models/Recipe.model';
import { RecipesService } from '../../_services/recipes.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  recipe: Recipe
  recipeForm: FormGroup | any
  allCategories: Category[]
  currentuser: any
  user: Users[]


  constructor(private formBuilder: FormBuilder, private router: Router, private recipeService: RecipesService, private categoryService: CategoryService, private userService: UsersService ) 
  { this.recipe = {id: 0, title: '', description: '', file: '', category: 0, user: 0}, this.allCategories = [{id: 0, name: ''}], this.user = [{id: 0, username:'', email:'', password:''}] }

  ngOnInit(): void {
    this.initForm()
    this.getAllCategory()
    this.currentuser = localStorage.getItem('token');

    this.userService.getCurrentUser(this.currentuser).subscribe(data => {
      this.user = data
      console.log(this.user[0].id)
    })
  }

  initForm() {
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
      categories: ['', Validators.required],
    });
  }

  onChange(event: any) {
    if (event.target.files && event.target.files.length) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            console.log('Width and Height', width, height);
            console.log(event.target.files[0].size)
            if (event.target.files[0].size > 350000) {
              console.log(event.target.files[0].size)
              Swal.fire('Erreur image', "Image trop lourde", 'error');
            }
            else if (width / height > 0.7) {
              Swal.fire('Erreur image', "Dimension de l'image non conforme", 'error');
            }
            else if (width < 100 ) {
              Swal.fire('Erreur image', "Image trop petite", 'error');
            }
            else {
              const file = event.target.files[0];      
              this.recipeForm.get('file').setValue(file);
            }
          };
        };
      }
    }
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];      
    //   this.recipeForm.get('file').setValue(file);
    // }
  }

  getRecipe() {
    const formData = new FormData();
    formData.append('file', this.recipeForm.get('file').value);
    formData.append('title', this.recipeForm.get('title').value);
    formData.append('description', this.recipeForm.get('description').value);
    formData.append('category', this.recipeForm.get('categories').value);
    formData.append('user', this.user[0].id.toString());
    
    this.recipeService.createRecipe(formData).subscribe( response => {
      console.log(response);
      console.log("recette creer");
      this.router.navigate(['recipes'])
    },
    error => {
      console.log(error)
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
}
