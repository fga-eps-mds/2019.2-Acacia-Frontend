workflow "Deploy to Heroku" {
  on = "push"
  resolves = "release"
}

action "docker-build" {
  uses = "actions/docker/cli@master"
  args = "build -t acacia-front-heroku ."
}

action "docker-run" {
  uses = "actions/docker/cli@master"
  args = "run -p 8080:8080 acacia-front-heroku"
  needs = "docker-build"
}

action "login" {
  uses = "actions/heroku@master"
  args = "container:login"
  needs = "docker-run"
  secrets = ["HEROKU_API_KEY"]
}

action "push" {
  uses = "actions/heroku@master"
  needs = "login"
  args = "container:push -a acacia-staging web"
  secrets = ["HEROKU_API_KEY"]
}

action "release" {
  uses = "actions/heroku@master"
  needs = "push"
  args = "container:release -a acacia-staging web"
  secrets = ["HEROKU_API_KEY"]
}

