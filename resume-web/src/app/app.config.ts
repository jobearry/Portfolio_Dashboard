import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ArrowLeft, Blocks, BookOpen, Building, ChartArea, CircleUser, ExternalLink, History, IdCard, LucideAngularModule, ToolCase } from 'lucide-angular'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers, reducers } from './shared/store.provider';
import { ProjectEffects } from './pages/projects/store/project.effect';
import { Github } from 'lucide-angular/src/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(reducers, {metaReducers}),
    provideEffects(ProjectEffects),
    importProvidersFrom(LucideAngularModule.pick({
        BookOpen, Building, ChartArea, CircleUser, IdCard, ToolCase, History,
        Blocks, ArrowLeft, Github, ExternalLink
    })),
]
};
