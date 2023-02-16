export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), (req, res) => {

      var httpClient = addon.httpClient(req);
      
      httpClient.get('https://teamleadtodolist.atlassian.net/rest/api/3/search?jql=project%20%3D%20TT', function (err, resp, data) {
        try {
          res.render('hello-world.hbs', {
            data: data,
          });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
      })
    });

    // Add additional route handlers here...
}

