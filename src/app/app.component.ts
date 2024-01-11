import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerForm: FormGroup;
  customers: any[] = [];
  isEmailUnique: boolean = true;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit() {
    if (this.customerForm.valid && this.isUniqueEmail(this.customerForm.value.email)) {
      this.customers.push(this.customerForm.value);
      this.customerForm.reset();
    }
  }

  removeCustomer(customer) {
    const index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  totalAmount() {
    return this.customers.reduce((total, customer) => total + parseFloat(customer.amount), 0).toFixed(2);
  }

  isUniqueEmail(email: string): boolean {
    this.isEmailUnique = !this.customers.some(customer => customer.email === email);
    return this.isEmailUnique;
  }
}
