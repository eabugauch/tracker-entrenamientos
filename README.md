# Tracker Entrenamientos

Aplicación web para el seguimiento de un programa intensivo de entrenamiento de 4 semanas enfocado en dominadas y fitness general.

## 🎯 Descripción

Tracker Entrenamientos es una Progressive Web App (PWA) que permite registrar y monitorear el progreso en un programa de entrenamiento estructurado. La aplicación está optimizada para uso móvil y funciona sin conexión.

## 📱 Características

- **Programa de 4 semanas**: Plan de entrenamiento predefinido con rutinas de 6 días por semana
- **Seguimiento de ejercicios**: Registro de series, repeticiones y peso para cada ejercicio
- **Monitoreo de progreso**: 
  - Peso corporal diario
  - Nivel de energía (escala 1-10)
  - Notas personalizadas por sesión
- **Dashboard de estadísticas**: Visualización del progreso y rendimiento
- **Exportación de datos**: Descarga de todos los datos en formato JSON
- **Modo offline**: Funciona sin conexión a internet gracias a las capacidades PWA

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tracker-entrenamientos.git

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

## 📋 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo en http://localhost:3000
- `npm test` - Ejecuta las pruebas en modo interactivo
- `npm run build` - Crea la versión de producción
- `npm run deploy:vercel` - Despliega en Vercel
- `npm run deploy:netlify` - Despliega en Netlify

## 🏋️ Estructura del Programa

### Semana 1-2: Base
- Dominadas asistidas y negativas
- Trabajo de fuerza con peso corporal
- Circuitos funcionales

### Semana 3-4: Intensificación
- Dominadas con lastre
- Mayor volumen de entrenamiento
- Ejercicios avanzados de tracción

## 💾 Almacenamiento de Datos

Todos los datos se guardan localmente en el navegador usando localStorage:
- Entradas de entrenamiento por fecha
- Métricas de rendimiento
- Historial de peso corporal
- Niveles de energía
- Notas de entrenamiento

## 🛠️ Tecnologías

- React 19.1.0
- Progressive Web App (PWA)
- localStorage para persistencia
- lucide-react para iconos
- Create React App

## 📱 Uso Móvil

La aplicación está optimizada para dispositivos móviles:
1. Visita la aplicación en tu navegador móvil
2. Añádela a tu pantalla de inicio para acceso rápido
3. Úsala sin conexión como una app nativa

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.