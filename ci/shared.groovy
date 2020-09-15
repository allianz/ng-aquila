import hudson.AbortException;


def isPullRequest() {
    return (env.CHANGE_ID != null) && (env.CHANGE_TARGET != null)
}

def getRepoURL() {
  def url = sh script: "git config --get remote.origin.url",  returnStdout: true
  if (env.ORIGINAL_REMOTE_URL)
    return env.ORIGINAL_REMOTE_URL
  return url
}

def getCommitSha() {
  def sha = sh script: "git rev-parse HEAD",  returnStdout: true
  return sha
}

// pipeline globals: currentStage currentBuild
// https://qa.nuxeo.org/jenkins/pipeline-syntax/globals
// https://developer.github.com/v3/repos/statuses/
def updateCommitStatus(Map params = [:]) {
  String context = params.get('context')
  String message = params.get('message')
  String state = params.get('state')
  String url = params.get('url', null)

  repoUrl = getRepoURL()
  commitSha = env.GIT_COMMIT

  echo "repoUrl: ${repoUrl}"
  echo "commitSha: ${commitSha}"

  def stepAction = [
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: repoUrl],
      commitShaSource: [$class: "ManuallyEnteredShaSource", sha: commitSha],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: context],
      errorHandlers: [[$class: 'ShallowAnyErrorHandler']],
      statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]

  if(url){
    stepAction << [statusBackrefSource: [$class: "ManuallyEnteredBackrefSource", backref: url]]
  }

  step(stepAction)
}


// This will login the technical git user
// so we can read refs and push tags
def gitAuthenticate() {
  def gitUserEmail = 'jenkins@notreal.gdf.allianz.de'
  def gitUserName = 'Jenkins'

  sh "git config user.email '${gitUserEmail}'"
  sh "git config user.name '${gitUserName}'"

  String remoteUrl = sh(script: 'git config --get remote.origin.url', returnStdout: true)

  // save original url for usage in getRepoURL()
  if(env.ORIGINAL_REMOTE_URL?.trim()) {
    echo "saving remote url: ${remoteUrl}, old one: ${env.ORIGINAL_REMOTE_URL}"
    env.ORIGINAL_REMOTE_URL = remoteUrl
  }

  withCredentials([[
      $class          : 'UsernamePasswordMultiBinding',
      credentialsId   : "${env.TAG_GIT_CREDENTIALS_ID}",
      usernameVariable: 'GIT_USERNAME',
      passwordVariable: 'GIT_PASSWORD'
  ]]) {
      def credentialString = String.format("%s:%s", GIT_USERNAME, GIT_PASSWORD)
      // insert user:password in the url string.
      remoteUrl = remoteUrl.replaceAll(/(https?:\/\/)(.+)/) { matches ->
        protocol = matches[1]
        rest = matches[2]
        "${protocol}${credentialString}@${rest}"
      }
      sh "git remote set-url origin ${remoteUrl}"
  }
}



def withNotification(context, description, Closure closure) {

  updateCommitStatus([
    context: context,
    message: "`${description}` started...",
    state: 'PENDING'
  ]);

  try {
    def result = closure.call()

    updateCommitStatus([
      context: context,
      message: "`${description}` succeeded.",
      state: 'SUCCESS'
    ]);
  } catch(Exception error) {

    updateCommitStatus([
      context: context,
      message: "`${description}` failed.",
      state: 'FAILURE'
    ]);

    // requires script approval in Jenkins for "new hudsonAbortException java.lang.String"
    throw new AbortException("Error occured in `${description}` - abort.");
  }

  return true
}


return this
