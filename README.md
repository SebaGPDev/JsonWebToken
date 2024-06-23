# Ejemplo de Autenticación con JWT en Express

Este proyecto demuestra cómo implementar autenticación usando JSON Web Tokens (JWT) en una aplicación Express.js.

## ¿Qué es JWT?

JWT (JSON Web Token) es un estándar abierto (RFC 7519) que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON. Esta información puede ser verificada y confiable porque está firmada digitalmente.

## Estructura del Proyecto

El proyecto consiste en un servidor Express simple que implementa autenticación JWT:

- Genera tokens para usuarios
- Protege rutas privadas
- Verifica tokens en solicitudes

## Dependencias

- express: Framework web para Node.js
- jsonwebtoken: Implementación de JWT

## Rutas

1. POST `/generate-token`: Genera un token JWT para un usuario
2. GET `/public`: Ruta pública accesible sin autenticación
3. GET `/private`: Ruta privada que requiere un token JWT válido

## Cómo funciona

1. **Generación de Token**:
   - El cliente envía un nombre de usuario a `/generate-token`
   - El servidor crea un token JWT con el nombre de usuario y una clave secreta
   - El token se envía de vuelta al cliente

2. **Acceso a Rutas Protegidas**:
   - El cliente incluye el token en el header de autorización
   - El middleware `verifyToken` extrae y verifica el token
   - Si el token es válido, se permite el acceso a la ruta privada

3. **Verificación de Token**:
   - Se usa `jwt.verify()` para comprobar la validez del token
   - Si es válido, se permite el acceso y se devuelve la información del usuario

## Seguridad

- El token expira después de 1 hora (`expiresIn: '1h'`)
- Se usa una clave secreta para firmar y verificar tokens (debe mantenerse segura)

## Cómo usar

1. Instala las dependencias con `npm install`
2. Inicia el servidor con `npm run dev`
3. Usa Postman o ThunderClient para probar las rutas

Ejemplo de uso:

1. Genera un token: `POST http://localhost:3000/generate-token`

2. Usa el token para acceder a la ruta privada: `GET http://localhost:3000/private`

## Notas para los estudiantes

- Estudia cómo se implementa `verifyToken` como middleware
- Observa cómo se usa `jwt.sign()` para crear tokens y `jwt.verify()` para verificarlos
- Considera cómo podrías mejorar la seguridad (por ejemplo, usando variables de entorno para la clave secreta)
