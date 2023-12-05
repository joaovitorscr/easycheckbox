export { default } from 'next-auth/middleware'

export const config = { matcher: ['/boxes/:path*', '/api', '/box/:path*'] }
