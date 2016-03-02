
After `npm install` on folder, you should `npm install -g nodemon` (-g = global shared) , the deamon to restart the server on every change you made to the code and start all the project with `nodemon crud.js`.

In case of `fsevents` warning message just ignore it. Document this [url]('https://github.com/Unitech/pm2/issues/1951').

I used a different approach with mongoose update because [of this]('http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html') otherwise the id is changing when update and Mongo does not accept that.

