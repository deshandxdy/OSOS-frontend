import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NewBookComponent } from './components/Home/new-book/new-book.component';
import { ListBooksComponent } from './components/BookManagement/list-books/list-books.component';
import { AuthorManagementComponent } from './components/author-management/author-management.component';

const routes: Routes = [
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'manage-books', children: [
      { path: 'all', component: ListBooksComponent, pathMatch: 'full' },
      { path: 'new-book', component: NewBookComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'manage-authors', children: [
      { path: 'all', component: AuthorManagementComponent, pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
