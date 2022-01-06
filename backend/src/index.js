import app from "./app";

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server listening on port ${app.get('port')}`)
})