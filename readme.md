# Install Heroku CLI:
Windows 64-bit: https://cli-assets.heroku.com/heroku-x64.exe
Mac: https://cli-assets.heroku.com/heroku.pkg

# Login to Heroku:
heroku login

# Create Heroku Space locally:
heroku create

# Push changes:
git add .

git commit -m “any message”

git push heroku master

# Run Locally:
(npm install)
heroku local web


# Start Dyno (public):
heroku ps:scale web=1

# Open page
heroku open

# Stop Dyno:
heroku ps:scale web=0



# View Logs:
heroku logs --tail 

# View Dynos:
heroku ps 



# Console access
heroku run bash

# Set Config Vars
heroku config:set TIMES=2

# See Config
heroku config
