import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ArrowLeft, Blocks, BookOpen, Building, ChartArea, CircleUser, History, IdCard, LucideAngularModule, ToolCase } from 'lucide-angular'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({
        BookOpen, Building, ChartArea, CircleUser, IdCard, ToolCase, History,
        Blocks, ArrowLeft
    })),
    provideStore(),
    provideEffects()
]
};
