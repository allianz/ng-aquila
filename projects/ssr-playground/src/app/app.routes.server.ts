import { RenderMode, ServerRoute } from '@angular/ssr';

export const SERVER_ROUTES: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Server }];
