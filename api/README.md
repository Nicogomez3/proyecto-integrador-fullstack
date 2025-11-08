# Documentacion de endpoints

# AUTH ROUTES (/auth)
- POST /auth/register
Registra un nuevo usuario y envía un correo con el código de verificación.
body JSON: 
{
  "nombre": "Nico Gomez",
  "email": "nico@example.com",
  "password": "123456"
}

Respuesta exitosa (201):

{
  "usuario": {
    "_id": "67890abcdef",
    "nombre": "Nico Gomez",
    "email": "nico@example.com",
    "rol": "USER",
    "verified": false,
    "code": "9PqDr3"
  }
}

- POST /auth/verify

Verifica el código de correo recibido para activar la cuenta.

Body JSON 

{
  "email": "nico@example.com",
  "code": "9PqDr3"
}

Respuesta (200):

{
  "message": "Usuario verificado correctamente",
  "user": {
    "_id": "67890abcdef",
    "email": "nico@example.com",
    "verified": true
  }
}

- POST /auth/login

Inicia sesión con usuario verificado.

Body JSON:

{
  "email": "nico@example.com",
  "password": "123456"
}

Respuesta (200):

{
  "usuario": {
    "_id": "67890abcdef",
    "nombre": "Nico Gomez",
    "email": "nico@example.com"
  },
  "token": "JWT_GENERADO"
}

# PRODUCT ROUTES (/products)

- GET /products

Obtiene la lista de productos disponibles.

Ejemplo: 

GET https://proyecto-integrador-fullstack.onrender.com/products

Respuesta: 

[
  {
    "_id": "123",
    "nombre": "Silla Nordic",
    "precio": 15000,
    "descripcion": "Silla moderna de madera clara",
    "imagen": "https://.../silla.jpg"
  }
]

- GET /products/:id
Obtiene un producto por su ID.

Ejemplo: 

GET https://proyecto-integrador-fullstack.onrender.com/products/123

Respuesta: 

{
  "_id": "123",
  "nombre": "Silla Nordic",
  "precio": 15000,
  "descripcion": "Silla moderna de madera clara"
}

# ORDER ROUTES (/orders)

- POST /orders
Crea una orden de compra

Body JSON: 
{
  "userId": "67890abcdef",
  "items": [
    { "productId": "123", "quantity": 2 }
  ],
  "total": 30000
}

Respuesta: 

{
  "message": "Orden creada correctamente",
  "order": {
    "_id": "abc123",
    "userId": "67890abcdef",
    "total": 30000,
    "status": "pending"
  }
}


