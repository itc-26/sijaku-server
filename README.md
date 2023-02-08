  
## Sijaku-Server
ExpressJS based REST API intended for [detailku-sija](https://github.com/NAoHR/detailku-sija). Built with MongoDB as its Database and integrated it with mongoose ORM. An Enhanced version of previous [detailku-server](https://github.com/NAoHR/detailku-server)

## Feature:
- Split routes to four different name
- 	- `auth` - Route that is related to authentication (admin, user)
- 	- `public` - Route that is publicly open
	- `user` - Route that's need to be authenticated to access and authorized to edit or delete
	- `admin` - admin related routes (on progress)
- Implemented JsonWebToken as its Authentication and Authorization service
- Featured with Mongoose as its ORM for mongoDB
- Use middleware to verify user or admin for authentication or authorization
- Featured with Bcrypt for password encryption
- Featured with Morgan as its logger middleware

## Library:
- [ExpressJS](https://expressjs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://github.com/expressjs/morgan)


## Routes and its Response

## Contributors
Made with Love by Najmi ~ [najmim625@gmail.com](mailto:najmim625@gmail.com)

> Feel free to contribute