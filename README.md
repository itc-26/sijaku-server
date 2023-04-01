  
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

#### 1. `/student` - `get`
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

#### 2. `/student/grade/:grade` - `get`
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

#### 3. `/student/user/:username` - `get`
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

### 4. `/job` - `get`

this route provide all jobs related to the current market demand as a form of response like below:


```json
{
	"ok" : true,
	"data": [
		{
			"salary": {
				"from": 4000000,
				"to": 5000000
			},
			"_id": "63efa6fa5cd76d946e30b66a",
			"title": "Jaksel Language Translator",
			"description": "literally need banget person buat translate all the thing yang kita say, but this person must to have personality yang bagus. and last but not least, this person harus bisa standby 24/7 dikopi kenangan kalo kita call",
			"reqruiter": "Jakselians",
			"region": "South Jakarta",
			"category": "Translator",
			"more": "https://twitter.com/",
			"__v": 0
		}
	]
}
```

### 5. `/memo` - `get` and `post`

this route show all messages from people about this vocation. Not only about this vocation, this route would also show messages for another student or teacher. this simply works like a menfess. The output is presented like below

#### get
```json
{
	"ok" : true,
	"data" : [
		{
			"_id": "63326c44c63fdac019e021aa",
			"sender": "Anon",
			"message": "Ketenangan benar sangat mahal",
			"__v": 0
		}
	]
}
```

#### post
```json
{
	"ok" : true,
	"message": "message was successfully added",
	"data" : {
		"_id": "63326c44c63fdac019e021aa",
		"sender": "Anon",
		"message": "Ketenangan benar sangat mahal",
		"__v": 0
  	}
}
```



### 6. `/message/:userId` - `post`

this show is intended to be the route to post a message to a user privately. the output is showed like below

```json
{
	"ok" : true,
	"message": "Message Was Sent"
}

```




</details>


<details>
<summary><b>User Routes</b></summary>

### User - `/api/user`

routes that can only be accessed by user that already passed all authentication and authorization process. This routes provide endpoints such as:
- `/me`
- `/get/:type`
- `/post/:type`
- `/edit/:type/:id`
- `/delete/:type/:id`

this route accept `Authorization` header filled with `bearer <token>`. To create the private key, you should create a file called `.env`. You can see the example on `.env_sample`

```json
{
	"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2VlNGU0MzU1YWRkMTAzZmM2MDE5ZmMiLCJpYXQiOjE2ODAzMTQ5MTUsImV4cCI6MTY4MDQ4NzcxNX0.kdbDMioEmSrARqGTq2a2SBh2nFhpcQ3EmxUNiARJY-s"
}
```

#### 1. `/me` - `get`
This routes provides a clear information of the current user you are logged in

```json
{
    "ok": true,
    "data": {
        "_id": "63ee4e4355add103fc6019fc",
        "name": "abitama mawlana",
        "grade": "X_SIJA_1",
        "username": "abitamamawlana_1",
        "certificates": [
            // all your certificates
        ],
        "projects": [
            // all your projects
        ],
        "skills": [
            // all your skills
        ],
        "privateMessages": [
            "63ee4e4355add103fc6019fd"
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

#### 2. `/get/:type` - `get`

this route is divided into three different endpoint such as
- `/get/certificate` - certificates
- `/get/project` - project
- `/get/skill` skill

for example, here's the response of `/get/certificate`

```json
{
    "ok": true,
    "message": "data fetched",
    "data": [
        {
            "_id": "63ee4e4355add103fc6019fe",
            "belongsTo": "63ee4e4355add103fc6019fc",
            "title": "Makhluk Paling Bahagia",
            "organizer": "Pt dalam diri Tbk",
            "certID": "AYOBAHAGIA-99221",
            "certLink": "https://www.reactiongifs.com/wp-content/uploads/2012/10/Bob-Ross-Beauty.gif",
            "__v": 0
        }
    ]
}
```
#### 3. `/post/:type` - `post`
this route allow you to post all your data such as
- `/post/certificate` - certificates
- `/post/project` - project
- `/post/skill` skill

you must filled the requirement of each route while you are sending your data to this route, you can include it in your request's body

here's a body payload example if you want to post a skill to this route
```json
{
    "skillName": "Menikmati Hidup",
    "percentage": 69
}
```

and you will get this response if the request was successfully sent

```json
{
    "ok": true,
    "message": "successfully added",
    "data": {
        "skillName": "Menikmati Hidup",
        "percentage": 69,
        "_id": "642795572cf265e4960a82a5",
        "belongsTo": "63ee4e4355add103fc6019fc",
        "__v": 0
    }
}
```

#### 4. `/edit/:type/:id` - `put`
this route gives you an access to edit your data such as
- `/edit/certificate` - certificates
- `/edit/project` - project
- `/edit/skill` skill

this endpoint also accept `id` to post that you want to edit

you must filled the requirement of each route while you are sending your data to this route, you can include it in your request's body

here's an example of request body payload if you want to edit skill that has an `id` of `642795572cf265e4960a82a5` (`/edit/skill/642795572cf265e4960a82a5`)

```json
{
    "percentage": 90
}
```

and you will get this response

```json
{
    "ok": true,
    "message": "skill updated"
}
```
#### 4. `/delete/:type/:id` - `delete`

this route gives you an access to delete your data such as
- `/edit/certificate` - certificates
- `/edit/project` - project
- `/edit/skill` skill

this endpoint also accept `id` to post that you want to edit

you must filled the requirement of each route while you are sending your data to this route, you can include it in your request's body

here's an example if you want to delete skill that has an `id` of `642795572cf265e4960a82a5` (`/delete/skill/642795572cf265e4960a82a5`), you will get this output

```json
{
    "ok": true,
    "message": "data deleted"
}
```

</details>


## Contributors

Made with Love by Najmi ~ [najmim625@gmail.com](mailto:najmim625@gmail.com)

> Feel free to contribute