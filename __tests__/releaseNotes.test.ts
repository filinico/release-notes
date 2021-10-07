import {test} from '@jest/globals'
import {extractReleaseNotes} from '../src/releaseNotes'

test('create release notes', async () => {
  const jiraUrl = 'https://myjira.atlassian.net/browse/'
  const description =
    '## Release content\n' +
    "- XX-12345 shj sdfh i3üql - Variable is undefined: 'tjhgs'\n" +
    '- XX-54321 bkiolaskj z uzwe: uikjh tzt.xxx\n' +
    '- XX-98765 PPP: bla bla hiuo usd sdh dds\n' +
    '- XX-88754 Piozt iuwe hjdsd - Tzuisoi soias po?\n' +
    '- XX-97643 posaoiiuzer -> XXX -> "\\7_tttt\\132weweoiKJx.xxx"\n' +
    '\n' +
    '## Checklist\n' +
    '- [x] E2E tests have to be green on release branch: https://myurl/job/e2e_test/'
  const expectedReleaseNotes =
    "- https://myjira.atlassian.net/browse/XX-12345 shj sdfh i3üql - Variable is undefined: 'tjhgs'\n" +
    '- https://myjira.atlassian.net/browse/XX-54321 bkiolaskj z uzwe: uikjh tzt.xxx\n' +
    '- https://myjira.atlassian.net/browse/XX-98765 PPP: bla bla hiuo usd sdh dds\n' +
    '- https://myjira.atlassian.net/browse/XX-88754 Piozt iuwe hjdsd - Tzuisoi soias po?\n' +
    '- https://myjira.atlassian.net/browse/XX-97643 posaoiiuzer -> XXX -> "\\7_tttt\\132weweoiKJx.xxx"'
  expect(extractReleaseNotes(description, jiraUrl)).toEqual(
    expectedReleaseNotes
  )
})
