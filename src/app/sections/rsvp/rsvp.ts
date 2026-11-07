import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WEDDING } from '../../wedding.config';
import { longDate } from '../../shared/format';
import { RevealDirective } from '../../shared/reveal.directive';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-rsvp',
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css',
})
export class Rsvp {
  private readonly fb = inject(FormBuilder);

  protected readonly deadline = longDate(WEDDING.rsvpDeadline);
  protected readonly guestOptions = Array.from({ length: WEDDING.rsvp.maxGuests }, (_, i) => i + 1);
  protected readonly status = signal<Status>('idle');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    contact: ['', Validators.required],
    attending: ['si' as 'si' | 'no', Validators.required],
    guests: [1],
    diet: [''],
    message: [''],
  });

  protected get attending(): boolean {
    return this.form.controls.attending.value === 'si';
  }

  protected invalid(control: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    const payload = {
      nombre: data.name,
      contacto: data.contact,
      asistira: data.attending === 'si' ? 'Sí' : 'No',
      personas: data.attending === 'si' ? data.guests : 0,
      alimentacion: data.diet,
      mensaje: data.message,
    };

    const { endpoint, email } = WEDDING.rsvp;

    if (!endpoint) {
      // Sin servicio configurado: abrimos un correo con la respuesta lista.
      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      const subject = `RSVP boda – ${data.name}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      this.status.set('sent');
      return;
    }

    this.status.set('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      this.status.set(res.ok ? 'sent' : 'error');
    } catch {
      this.status.set('error');
    }
  }

  reset(): void {
    this.form.reset();
    this.status.set('idle');
  }
}
