  
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

<details>
<summary><b>Auth Routes</b></summary>

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

</details>


<details>
<summary><b>Public Routes</b></summary>


### Public - `/api/public`

routes that are opened to public without any authentication and authorization process. This routes provide endpoints such as:
- `/student`
- `/student/grade/:grade`
- `/student/user/:username`

#### 1. `/student`
this route provides information which describes each class and its total students. This route will return a response like below:

```json
{
	"ok": true,
	"data": {
		"XII_SIJA_1": {
			"_id": "XII_SIJA_1",
			"count": 35,
			"grade": "XII SIJA 1",
			"link": "/api/public/student/grade/XII_SIJA_1"
	},
		"XII_SIJA_2": {
			"_id": "XII_SIJA_2",
			"count": 34,
			"grade": "XII SIJA 2",
			"link": "/api/public/student/grade/XII_SIJA_2"
	}
		// more data
}
```

#### 2. `/student/grade/:grade`
this route takes grade `(X_SIJA_1, X_SIJA_2, etc)` as its `grade` parameter, students will be filtered to match the `grade` parameter. After filtering process is done, students's detail and its data; such as skill, detail, project, and  certificate will be represented as below:

```json
{
	"ok": true,
	"data": {
	"grade": "X SIJA 1",
	"students": [
		{
			"_id": "63ee4e4355add103fc6019fc",
			"name": "John Doe",
			"grade": "X_SIJA_1",
			"username": "JohnDoe_1",
			"certificates": [
				"63ee4e4355add103fc6019fe"
				],
			"projects": [
				"63ee4e4355add103fc6019ff"
				],
			"skills": [
				"63ee4e4355add103fc601a00"
				],
			"privateMessages": [
				"63ee4e4355add103fc6019fd"
				],
			"details": "63ee4e4355add103fc601a01",
			"__v": 0,
			"link": "/api/public/student/user/students_name_1"
		},
		// more like above
	]
},
```

#### 3. `/student/user/:username`
this route takes username as its `username` parameter, student will be filtered by its username that is unique to one another so the output of this route either one data or nothing. 

After filtering process is done, students's detail and its data; such as skill, detail, project, and  certificate will be collected by its refrence and will be represented as below:

```json
{
	"ok": true,
	"data": {
		"_id": "63ee4e4355add103fc6019fc",
		"name": "John Doe",
		"grade": "X_SIJA_1",
		"username": "JohnDoe_1",
		"certificates": [
			{
			"_id": "63ee4e4355add103fc6019fe",
			"belongsTo": "63ee4e4355add103fc6019fc",
			"title": "Makhluk Paling Bahagia",
			"organizer": "Pt dalam diri Tbk",
			"certID": "AYOBAHAGIA-99221",
			"certLink": "https://www.reactiongifs.com/wp-content/uploads/2012/10/Bob-Ross-Beauty.gif",
			"__v": 0
			}
		],
		"projects": [
			{
			"_id": "63ee4e4355add103fc6019ff",
			"belongsTo": "63ee4e4355add103fc6019fc",
			"name": "100 days of happiness",
			"description": "sebuah projek untuk melatih konsistensi dalam melakukan sesuatu tanpa stop sampai target tercapai, KEBAGAGIAAN",
			"link": "http://100happydays.com/id/",
			"__v": 0
			}
		],
		"skills": [
			{
			"_id": "63ee4e4355add103fc601a00",
			"belongsTo": "63ee4e4355add103fc6019fc",
			"skillName": "Bahagia",
			"percentage": 98.11790032309312,
			"__v": 0
			}
		],
		"details": {
			"_id": "63ee4e4355add103fc601a01",
			"belongsTo": "63ee4e4355add103fc6019fc",
			"description": "tidak semua dapat dimengerti, namun semua pasti punya arti",
			"linkedin": "https://www.linkedin.com/in/",
			"github": "http://github.com/",
			"email": "lovelyemail@gmail.com",
			"web": "https://i.giphy.com/media/26BRv0ThflsHCqDrG/giphy.webp",
			"__v": 0
			},
			"__v": 0
		}
}
```



</details>






## Contributors

Made with Love by Najmi ~ [najmim625@gmail.com](mailto:najmim625@gmail.com)

> Feel free to contribute