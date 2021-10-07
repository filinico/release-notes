import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  extractReleaseNotes,
  getPRIdFromCommit,
  getVersionFromBranch
} from './releaseNotes'
import {Context} from '@actions/github/lib/context'
type GitHub = ReturnType<typeof github.getOctokit>

interface ReleaseNotes {
  releaseNotes: string
  releaseVersion: string
}

export interface GitHubContext {
  octokit: GitHub
  context: Context
}

export const onPush = async (
  actionContext: GitHubContext,
  jiraUrl: string
): Promise<void> => {
  const {octokit, context} = actionContext
  const {
    payload: {
      ref,
      head_commit: {message}
    }
  } = context
  const releaseVersion = getVersionFromBranch(ref, 'production')
  core.info(`Release version:${releaseVersion}`)
  const prId = getPRIdFromCommit(message)
  if (prId) {
    const pullRequest = await octokit.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: parseInt(prId)
    })
    const releaseItems = extractReleaseNotes(pullRequest.data.body, jiraUrl)
    if (releaseItems) {
      const releaseNotes: ReleaseNotes = {
        releaseNotes: releaseItems,
        releaseVersion
      }
      core.setOutput('RELEASE_NOTES', releaseNotes)
    } else {
      core.error('No jira issues resolved.')
    }
  }
}
