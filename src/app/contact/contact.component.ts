import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { FeedbackService } from '../services/feedback.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ]),

    trigger('flyInOut', [
      state('*', style({ opacity: 1, transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ]),

    trigger('expand', [
      state('*', style({opacity:1, transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateY(-50%)', opacity: 0}),
        animate('200ms ease-in', style({opacity:1, transform: 'translateX(0)'}))
      ])
    ]),

    trigger('hide', [
      state('shown', style({
        visibility: 'visible'
      })),
      state('hidden', style({
        display: 'none'
      })),
      transition('* => *', animate('0.1s ease-in-out'))
    ]),

  ],
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  visibilityForm = 'shown';
  visibilitySpinner = 'hidden';

  formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
    };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.visibilityForm = 'hidden';
    this.visibilitySpinner = 'shown';

    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);

    this.feedbackService.submitFeedback(this.feedbackForm.value)
      .subscribe(feedback => {
          this.visibilitySpinner = 'hidden';
          this.feedback = feedback;
          setTimeout(func=>{
            this.feedback = null;
            this.visibilityForm = 'shown';
            }, 5000);
        });

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

}
