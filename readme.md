# Pre-setup, install Heroku CLI:
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

# Setup:
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
