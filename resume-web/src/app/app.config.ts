import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BookOpen, Building, ChartArea, CircleUser, IdCard, LucideAngularModule, ToolCase } from 'lucide-angular'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({BookOpen, Building, ChartArea, CircleUser, IdCard, ToolCase})
    )
  ]
};
