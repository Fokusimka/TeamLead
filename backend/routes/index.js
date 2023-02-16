export default function routes(app, addon) {
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/hello-world', addon.authenticate(), (req, res) => {

      var httpClient = addon.httpClient(req);
      let projectsData

      httpClient.get(`https://teamleadtodolist.atlassian.net/rest/api/3/project/search`, function (err, resp, data) {
        try {
          projectsData = data
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
      })

        httpClient.get(`https://teamleadtodolist.atlassian.net/rest/api/3/search`, function (err, resp, data) {
        try {
          res.render('hello-world.hbs', {
            data: data,
            projects: projectsData
          });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
      })
    });

}

