  
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

### Auth - `/api/auth`
Routes that is related to authentication process. This routes are divided into two endpoints 
-	`/admin/login`
-	`/user/login`

it accepts requests with `Content-type`of `Application/json`. This routes only accepts `POST` as its request method. Both endpoints are accepts request body with `username` as `string` and `password` as `string`

This route will return this json formatted like below with token generated for the next authorization process.
```json
    {
		"ok": true,
		"data": {
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJlNmJlMzExYTVlYzdjM2ZjMDg1YTIiLCJpYXQiOjE2NzU0MzY2OTMsImV4cCI6MTY3NTYwOTQ5M30.IRWS1-GPXWWTntd1SiFFhlzjEhycDBKKDACvbB8_dXQ"
		}
	}
```

## Contributors
Made with Love by Najmi ~ [najmim625@gmail.com](mailto:najmim625@gmail.com)

> Feel free to contribute