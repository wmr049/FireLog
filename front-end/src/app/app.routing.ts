import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'usuario', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuario' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
