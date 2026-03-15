import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  ArrowLeft, Blocks, BookOpen, Building, ChartArea, ChartScatter, CircleUser, Construction, ExternalLink, FileDown, Github, History, IdCard,
  LucideAngularModule, MapPin, Toolbox, ToolCase
} from 'lucide-angular'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers, reducers } from './shared/store.provider';
import { ProjectEffects } from './features/github/store/github.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(reducers, {metaReducers}),
    provideEffects(ProjectEffects),
    importProvidersFrom(LucideAngularModule.pick({
        BookOpen, Building, ChartArea, CircleUser, IdCard, ToolCase, History,
        Blocks, ArrowLeft, Github, ExternalLink, ChartScatter, Construction,
        Toolbox, FileDown, MapPin
    })),
]
};
