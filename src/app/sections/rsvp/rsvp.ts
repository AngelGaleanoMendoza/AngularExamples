import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WEDDING } from '../../wedding.config';
import { longDate } from '../../shared/format';
import { RevealDirective } from '../../shared/reveal.directive';

type Status = 'idle' | 'sending' | 'sent' | 'manual' | 'error';

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
  protected readonly email = WEDDING.rsvp.email;
  /** Texto de la respuesta, para enviarla a mano cuando no hay servicio configurado. */
  protected readonly summary = signal('');
  protected readonly mailto = signal('');
  protected readonly copied = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    contact: ['', Validators.required],
    attending: ['yes' as 'yes' | 'no', Validators.required],
    guests: [1],
    diet: [''],
    message: [''],
  });

  protected get attending(): boolean {
    return this.form.controls.attending.value === 'yes';
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
      name: data.name,
      contact: data.contact,
      attending: data.attending === 'yes' ? 'Yes' : 'No',
      guests: data.attending === 'yes' ? data.guests : 0,
      dietary: data.diet,
      message: data.message,
    };

    const { endpoint, email } = WEDDING.rsvp;

    if (!endpoint) {
      // Sin servicio configurado: abrimos un correo con la respuesta lista.
      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      const subject = `Wedding RSVP – ${data.name}`;
      this.summary.set(body);
      this.mailto.set(
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      );
      this.status.set('manual');
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

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.summary());
      this.copied.set(true);
    } catch {
      this.copied.set(false);
    }
  }

  reset(): void {
    this.copied.set(false);
    this.form.reset();
    this.status.set('idle');
  }
}
