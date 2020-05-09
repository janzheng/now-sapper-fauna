
// logs into fauna
import { query as q } from 'faunadb'
import faunadb from 'faunadb'

export const profileApi = async faunaSecret => {
	const faunaClient = new faunadb.Client({secret: faunaSecret})
  const ref = await faunaClient.query(q.Identity())
  return {id: ref.id}
}

export function get(req, res, next) {

  const user = req.session.user

  if (!user) {
		res.statusCode = 401
    res.end('No access')
  }

  try {
		profileApi(user).then((result) => {
			console.log('sending back result: ', result)
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result))
		}).catch((err) => {
			console.error('profile.js fauna no access', err)
			// res.statusCode = 401
	    // res.end('No access')
			throw new Error(err)
		})
  } catch(err) {
			console.error('profile.js something went wrong', err)
			throw new Error(err)
  }
}
