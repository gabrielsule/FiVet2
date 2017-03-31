import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';

import { CamaraPage } from '../pages/camara/camara';
import { CalendarioPage } from '../pages/calendario/calendario';
import { HomePage } from '../pages/home/home';
import { PropietariosPage } from '../pages/propietarios/propietarios';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuSuperior } from '../pages/home/subPages/menuSuperior/menuSuperior';
import { CaballosInd } from '../pages/home/subPages/caballosInd/caballosInd';
import { FichaCaballo } from '../pages/home/fichaCaballo/fichaCaballo';
import { AdminCaballoPage } from '../pages/home/adminCaballo/adminCaballo';
import { MenuFotos } from '../pages/home/fichaCaballo/subPages/menuFotos/menuFotos';
import { MenuInformacion } from '../pages/home/fichaCaballo/subPages/menuInformacion/menuInformacion';
import { DatosPage } from '../pages/home/fichaCaballo/datosPage/datosPage';
import { UbicacionPage } from '../pages/home/fichaCaballo/ubicacionPage/ubicacionPage';
import { AdminUbicacionPage } from '../pages/home/fichaCaballo/ubicacionPage/adminUbicacion/adminUbicacion';
import { AlimentacionPage } from '../pages/home/fichaCaballo/alimentacionPage/alimentacionPage';
import { HerrajePage } from '../pages/home/fichaCaballo/herrajePage/herrajePage';
import { NotasPage } from '../pages/home/fichaCaballo/notasPage/notasPage';
import { AltaNotas } from '../pages/home/fichaCaballo/notasPage/subPages/altaNotas';
import { PopOverDatos } from '../pages/home/fichaCaballo/datosPage/subPages/popOver/popOverDatos';
import { PopOverUbicacion } from '../pages/home/fichaCaballo/ubicacionPage/subPages/popOver/popOverUbicacion';
import { PopOverFichaCaballo } from '../pages/home/fichaCaballo/subPages/popOver/popOverFichaCaballo';

import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { NotificacionesInsertPage } from '../pages/notificaciones/notificaciones-insert';
import { NotificacionesViewPage } from '../pages/notificaciones/notificaciones-view';

@NgModule({
  declarations: [
    MyApp,
    CamaraPage,
    CalendarioPage,
    HomePage,
    NotificacionesPage,
    PropietariosPage,
    TabsPage,
    MenuSuperior,
    CaballosInd,
    FichaCaballo,
    PopOverFichaCaballo,
    MenuFotos,
    MenuInformacion,
    DatosPage,
    UbicacionPage,
    AdminUbicacionPage,
    PopOverDatos,
    PopOverUbicacion,
    AdminCaballoPage,
    AlimentacionPage,
    HerrajePage,
    NotasPage,
    AltaNotas,
    NotificacionesInsertPage,
    NotificacionesViewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CamaraPage,
    CalendarioPage,
    HomePage,
    NotificacionesPage,
    PropietariosPage,
    TabsPage,
    FichaCaballo,
    PopOverFichaCaballo,
    DatosPage,
    UbicacionPage,
    AdminUbicacionPage,
    PopOverDatos,
    PopOverUbicacion,
    AdminCaballoPage,
    AlimentacionPage,
    HerrajePage,
    NotasPage,
    AltaNotas,
    NotificacionesInsertPage,
    NotificacionesViewPage
  ],
  providers: []
})
export class AppModule { }
