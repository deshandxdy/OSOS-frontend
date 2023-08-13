import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/shared/author.service';
import { Modal, initFlowbite } from 'flowbite';

@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.css']
})
export class AuthorManagementComponent implements OnInit {
  modal!: any
  isLoading: boolean = false
  authors: any

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.initializeModal()
    this.getAuthors()
  }

  initializeModal = () => {
    initFlowbite()
    const $targetEl = document.getElementById('defaultModal');
    this.modal = new Modal($targetEl);
  }

  getAuthors = () => {
    this.authorService.getAuthors().subscribe(
      (result) => {
        this.authors = result.authors;
        console.log(result.authors)
      },
      (error) => {
        console.log(error)
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )
  }
}
