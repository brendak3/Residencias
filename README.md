# Residencias
Proyecto Agosto-Diciembre 2019

# Instalación Windows
Descargamos e instalamos NodeJS de su página oficial: https://nodejs.org/es/

Clonamos el repositorio ya sea con un cliente visual de git o con comandos en terminal.
Una vez que se tenga clonado, nos colocamos en la ruta del proyecto y abrimos una consola (ya sea power shell o consola normal) e ingresamos el comando:
```
npm install
```

Una vez que termine de instalar todas las dependencias del proyecto, debemos verificar que nuestra maquina cuente con Visual C++, para esto debemos descargar el instalador de Visual Studio Installer de su página oficial: https://visualstudio.microsoft.com/es/

Si es la primera vez que instalamos Visual Studio entonces solo seleccionamos la opcion de Desarrollo de Escritorio con Visual C++, si es que ya contabamos con Visual Studio instalado anterior mente debemos de abrir Visual Studio Installer y seleccionar la opcion de Modificar y seleccionar la casilla de Desarrollo de Escritorio con Visual C++.

Procederemos a instalar Python versión 2.7.x, si es que ya cuenta con esta versión entonces pude saltarse este paso. De igual manera descargamos python de su página oficial: https://www.python.org/downloads/release/python-2717/

Ahora debemos de reemplazar las carpetas de @serialport y serialport que se encuentran en:
```
\Residencias\Electron_example\node_modules\@openbci\cyton\node_modules 
```
Por los que se encuentran en la carpeta raíz del proyecto:
```
\Residencias\Electron_example\node_modules\
```
Ya con Visual C++ y Python 2.7.x instalados volvemos a nuestra consola de comandos y corremos el siguiente comando (recuerde que debe de estar posicionado en la ruta del proyecto como se muestra en la imagen)
```
.\node_modules\.bin\electron-rebuild.cmd
```