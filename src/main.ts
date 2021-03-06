import * as core from '@actions/core'
import * as github from '@actions/github'
import {onPush} from './eventHandler'

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('GITHUB_TOKEN', {required: true})
    const jiraUrl = core.getInput('JIRA_ISSUE_URL', {required: true})
    core.info(`GITHUB_EVENT_NAME=${process.env.GITHUB_EVENT_NAME}`)
    core.info(`GITHUB context action=${github.context.payload.action}`)
    const octokit = github.getOctokit(githubToken)
    const gitHubContext = {
      octokit,
      context: github.context
    }
    if (process.env.GITHUB_EVENT_NAME === 'push') {
      core.info(`start onPush`)
      await onPush(gitHubContext, jiraUrl)
      core.info(`onPush finished`)
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    core.setFailed(error.message)
  }
}

run()
