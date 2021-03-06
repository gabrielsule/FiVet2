import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CalendarioPage } from '../calendario/calendario';
import { CamaraPage } from '../camara/camara';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { PropietariosPage } from '../propietarios/propietarios';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeRoot: any = HomePage;
  calendarRoot: any = CalendarioPage;
  cameraRoot: any = CamaraPage;
  eventsRoot: any = NotificacionesPage;
  ownerRoot: any = PropietariosPage;

  constructor() {

  }
}
