export const getPRIdFromCommit = (commitMessage: string): string | null => {
  const regex = /#[0-9]+/g
  const matches = commitMessage.match(regex)
  if (matches) {
    return matches[0].replace('#', '')
  }
  return matches
}
export const extractReleaseNotes = (
  description: string | null,
  jiraUrl: string
): string | null => {
  if (!description) {
    return null
  }
  const regex =
    /- [\w]{2,4}-[0-9]{5,6} [\w \\\->".#*+,%$!/'<_:;&?()=üäößéèàôî]+/g
  const items = description.match(regex)
  if (items) {
    return items.map(item => item.replace(/^- /g, `- ${jiraUrl}`)).join('\n')
  }
  return null
}

export const getVersionFromBranch = (
  branchName: string,
  branchType: string
): string => {
  if (branchName.includes(branchType)) {
    const sourceBranchSuffixArray = branchName.split('/')
    if (sourceBranchSuffixArray.length > 1)
      return sourceBranchSuffixArray[sourceBranchSuffixArray.length - 1]
  }
  return branchName
}
