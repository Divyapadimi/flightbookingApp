import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';

const bootstrapConfig = {
  // Combine providers from appConfig and standalone component needs:
  providers: [
    ...appConfig.providers || [], // Include providers from appConfig (if any)
    provideHttpClient() // Explicitly provide HttpClient for standalone component
  ]
};


bootstrapApplication(AppComponent, bootstrapConfig)
  .catch((err) => console.error(err));
