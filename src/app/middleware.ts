import { NextRequest } from 'next/server'
 
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/*',
}
 
export function handler(request: NextRequest) {
  // Call our authentication function to check the request
  console.log('Call')
}