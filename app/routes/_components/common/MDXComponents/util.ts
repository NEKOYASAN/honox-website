export const getCodeLanguageLabel = (language: string | undefined) => {
  if (language === undefined) {
    return 'plain'
  }

  const languageMap: Record<string, string> = {
    javascript: 'JavaScript',
    js: 'JavaScript',
    jsx: 'JavaScript',
    typescript: 'TypeScript',
    ts: 'TypeScript',
    tsx: 'TypeScript',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    md: 'Markdown',
    mdx: 'Markdown',
    py: 'Python',
    go: 'Go',
    java: 'Java',
    kotlin: 'Kotlin',
    bash: 'Bash',
    sh: 'Shell',
  }

  return languageMap[language] || language
}
