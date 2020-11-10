const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const async = require('async');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const TOKEN_PATH = './config/token.json';

fs.readFile('credentials.json', (error, content) => {
  if (error) return console.log('Error loading client secret file:', error);
  //authorize(JSON.parse(content), listFiles);
  authorize(JSON.parse(content), getFile);
  authorize(JSON.parse(content), uploadFile);
});

/**
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (error, token) => {
    if (error) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    //callback(oAuth2Client); //list files and upload file
    callback(oAuth2Client, '1l1ejQNlbTE0Vc-ZqX5GecvSA4Kxun4xe'); //get file
  });
}

/**
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (error, token) => {
      if (error) return console.error('Error retrieving access token', error);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
        if (error) return console.error(error);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  getList(drive, '');
}
function getList(drive, pageToken) {
  drive.files.list(
    {
      corpora: 'user',
      pageSize: 10,
      pageToken: pageToken ? pageToken : '',
      fields: 'nextPageToken, files(*)',
    },
    (error, response) => {
      if (error) return console.log('The API returned an error: ' + error);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        processList(files);
        if (response.data.nextPageToken) {
          getList(drive, response.data.nextPageToken);
        }
      } else {
        console.log('No files found.');
      }
    }
  );
}
function processList(files) {
  console.log('Processing....');
  files.forEach((file) => {
    console.log(file);
  });
}
function uploadFile(auth) {
  const drive = google.drive({ version: 'v3', auth });
  var fileMetadata = {
    name: 'data.xlsx',
  };
  var media = {
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    body: fs.createReadStream('data.xlsx'),
    permissions: [
      {
        type: 'anyone',
      },
    ],
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log('File Id: ', response.data.id);
        console.log(
          'URL:',
          `https://www.googleapis.com/drive/v3/files/1WV93-DojxaqoB10vb3v8C7M8DXRdxB-q/permissions?fields=id${response.data.id}` //https://drive.google.com/file/d
        );

        var fileId = response.data.id;
        var permissions = [
          {
            type: 'anyone',
            role: 'writer',
            emailAddress: 'nasirnawruzi@gmail.com',
          },
        ];

        async.eachSeries(
          permissions,
          function (permission, permissionCallback) {
            drive.permissions.create(
              {
                resource: permission,
                fileId: fileId,
                fields: 'id',
              },
              function (error, response) {
                if (error) {
                  console.error(error);
                  permissionCallback(error);
                } else {
                  console.log('Permission ID: ', response.id);
                  console.log('Granted');
                }
                if (response) {
                  permissionCallback(response);
                }
              }
            );
          },
          function (error) {
            if (error) {
              console.error(error);
            } else {
            }
          }
        );
      }
    }
  );
}
function getFile(auth, fileId) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.get({ fileId: fileId, fields: '*' }, (error, response) => {
    if (error) return console.log('The API returned an error: ' + error);
    console.log(response.data);
  });
}
