import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/shared/author.service';
import { Modal, initFlowbite } from 'flowbite';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.css']
})
export class AuthorManagementComponent implements OnInit {
  modal!: any
  isLoading: boolean = false
  authors: any

  constructor(
    private authorService: AuthorService,
    private alert: AlertService

  ) { }

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
    this.isLoading = true
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

  updateStatus = (event: any, author_id: number) => {
    const formData: any = new FormData()

    formData.append('author_id', author_id)
    formData.append('status', event.target.checked == true ? 1 : 0)

    this.authorService.changeStatus(formData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error.error.errors)

        if (error.message) {
          this.alert.error(error.message)
        }
      },
      () => {
        this.getAuthors()
        this.alert.success("Author status updated successfully")
      }
    );
  }
}
