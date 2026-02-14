export async function checkParams(socket: any) {
  const url = new URL(`http://localhost${socket.url}`)
  const lang = url.searchParams.get('lang') || 'en'
  return { lang }
}
