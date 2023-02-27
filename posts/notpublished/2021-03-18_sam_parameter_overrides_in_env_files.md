---
title: SAM parameter overrides in .env files
date: 2021/3/18
description: Right. I think the main reason against using the samconfig.toml is the secrets issue since you will most likely want to commit it to git. If you add to .gitignore than no problems, works great. Otherwise you could have secrets committed to your repo.
tag: AWS, AWS SAM, Node
author: You
published: false
---

# SAM parameter overrides in .env files

Tags: AWS, AWS SAM, Node

Right. I think the main reason against using the samconfig.toml is the secrets issue since you will most likely want to commit it to git. If you add to .gitignore than no problems, works great. Otherwise you could have secrets committed to your repo.

Of course creating scripts with the parameter overrides in your package.json will also add secrets to your git repo as well.

### **Dotenv and cross-var**

I prefer using a .env file then using doting and cross-var to create scripts in my package json.

`yarn dotenv -e .env.prod -- cross-var sam deploy --stack-name NAME-OF-STACK --parameter-overrides NodeEnv=prod parameter1=%PARAMETER1% parameter2=%PARAMETER2% parameter3=%PARAMETER3%`

Then you can have multiple .env files for each environment (.env.dev, .env.prod, .env.uat) and create a package json script for each (I use start for dev and `sam local start` in the script instead of `sam deploy`, deploy-prod, deploy-uat).

That way I am using an industry standard .env file that can hold secrets and even though the package.json scripts can get quite large, I'm not editing them often so I can just use the yarn *scriptname* and I'm good to go.

Then it's always good practice to add .env.example files as well that will be committed to git so anyone cloning the repo will at least know what environment variables are required.

Hope that gives another possible way of organizing.
