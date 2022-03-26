
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/Category.model';
import { FileUpload } from 'src/app/_models/Fileupload.model';
import { Users } from 'src/app/_models/Users.model';
import { CategoryService } from 'src/app/_services/category.service';
import { UploadfileService } from 'src/app/_services/uploadfile.service';
import { UsersService } from 'src/app/_services/users.service';
import Swal from 'sweetalert2';
import { Recipe } from '../../_models/Recipe.model';
import { RecipesService } from '../../_services/recipes.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  _recipe: Recipe

  @Input() set recipe(recipe: Recipe) {
    this._recipe = recipe
    this.initForm()
  }
  public Editor = ClassicEditor;

  recipeForm: FormGroup | any
  allCategories: Category[]
  currentuser: any
  user: Users[]
  // selectedFiles: FileList | any;
  currentFileUpload: FileUpload | any;
  recipeFile: any

  constructor(private formBuilder: FormBuilder, private router: Router, private recipeService: RecipesService, private categoryService: CategoryService, private userService: UsersService, private route: ActivatedRoute, private uploadFileService: UploadfileService) 
  { this._recipe = {id: 0, title: '', description: '', file: 0, category: 0, user: 0, image_url: '', ingredients: ''}, this.allCategories = [{id: 0, name: ''}], this.user = [{id: 0, username:'', email:'', password:'', file: 0, image_url: '', is_superuser: false }] 
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          // 'insertTable',
          '|',
          // 'imageUpload',
          '|',
          'undo',
          'redo'
        ]
      },
      image: {
        toolbar: [
          // 'imageStyle:full',
          'imageStyle:side',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      language: 'fr'
    };
  }

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
    if (this._recipe == null) {
      this.recipeForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        file: [''],
        categories: ['', Validators.required],
        ingredients: ['', Validators.required],
      });
    } else {
      if (this._recipe.file) {
        console.log(this._recipe.file)
        this.uploadFileService.getSingleFile(this._recipe.file).subscribe(data => {
          this.recipeFile = data.file
        })
      }
      this.recipeForm = this.formBuilder.group({
        title: [this._recipe.title, Validators.required],
        description: [this._recipe.description, Validators.required],
        file: [this._recipe.file],
        categories: [this._recipe.category, Validators.required],
        ingredients: [this._recipe.ingredients, Validators.required],
      })
    }
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
            if (event.target.files[0].size > 402000) {
              console.log(event.target.files[0].size)
              Swal.fire('Erreur image', "Image trop lourde", 'error');
            }
            else if (width / height > 0.76) {
              Swal.fire('Erreur image', "Dimension de l'image non conforme", 'error');
            }
            else if (width < 100 ) {
              Swal.fire('Erreur image', "Image trop petite", 'error');
            }
            else {
              this.currentFileUpload = event.target.files[0]
              this.upload()
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
    const title = this.recipeForm?.get('title')?.value;
    const description = this.recipeForm?.get('description')?.value;
    const category = this.recipeForm?.get('categories')?.value;
    const user = this.user[0].id
    const ingredients = this.recipeForm?.get('ingredients')?.value;

    console.log(this._recipe)

    // this._recipe = new Recipe()
    this._recipe.title = title
    this._recipe.description = description
    this._recipe.category = category
    this._recipe.user = user
    this._recipe.ingredients = ingredients
  
    if(this.currentFileUpload && this.currentFileUpload.file != null) {
      this._recipe.file = this.currentFileUpload.id
      this._recipe.image_url = this.currentFileUpload.file
      console.log(this.currentFileUpload.file)
      console.log("getrecipe" + this._recipe.file)
    } else {
      console.log(this._recipe)
    }

    if (this.route.snapshot.params['id']) {
      console.log(this._recipe.file)
      // this.uploadFileService.deleteFile(this._recipe.file).subscribe( data => {
      //   console.log(data)
      // }, error => {
      //   console.log(error)
      // })
      console.log("je suis le recipe file" + this._recipe.file)
      this._recipe.title = this._recipe.title.charAt(0).toUpperCase() + this._recipe.title.slice(1)
      const id = this.route.snapshot.params['id'];
      this.recipeService.updateRecipe(id, this._recipe).subscribe(response => {
        console.log(response)
        console.log("recette update")
        this.router.navigate(['recipes']);
      },
      error => {
        console.log(error)
      })
    } else {
      this._recipe.title = this._recipe.title.charAt(0).toUpperCase() + this._recipe.title.slice(1)
      console.log(this._recipe.title)
      this.recipeService.createRecipe(this._recipe).subscribe( response => {
        console.log(response);
        console.log("recette crée");
        this.router.navigate(['recipes']);
      },
      error => {
        console.log(error)
      })
    }
  }

  upload() {
    console.log(this._recipe.file)
    // const file = new FileUpload(this.currentFileUpload);
    const formData = new FormData();
    formData.append('file', this.currentFileUpload)
    console.log("je suis le currentFileUpload" + this.currentFileUpload.name)
    console.log("je suis l' url de currentFileUpload" + this.currentFileUpload.url)
    console.log("je suis l'id de l'image" + this.currentFileUpload.id)
    this.uploadFileService.uploadFile(formData).subscribe(data => {
      this.currentFileUpload = data
      console.log(this.currentFileUpload)
      console.log(this.currentFileUpload.file)
      console.log(this._recipe.file)
      console.log("file Uploaded")
    }, error => {
      console.log(error)
    })

    console.log(this._recipe.file)

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