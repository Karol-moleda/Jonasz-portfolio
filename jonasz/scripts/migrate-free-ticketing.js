/*
  Sanity migration: ensure all `concert` docs have `ticketing.type` set.
  - If missing and legacy `ticketLink` exists => set type = 'paid' and migrate the link
  - If missing and no legacy link => set type = 'free'
  - If `ticketing` object missing, create it
  Usage:
    - Dry run (preview changes):
        sanity exec ./scripts/migrate-free-ticketing.js --with-user-token --dry
    - Apply changes:
        sanity exec ./scripts/migrate-free-ticketing.js --with-user-token
*/

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2023-08-01'})

async function run() {
  const dryRun = process.argv.includes('--dry')

  const docs = await client.fetch(`
    *[_type == "concert" && (!defined(ticketing) || !defined(ticketing.type))]{
      _id,
      _rev,
      ticketLink,
      ticketing
    }
  `)

  if (!docs.length) {
    console.log('Nothing to migrate. All concert docs have ticketing.type set.')
    return
  }

  console.log(`Found ${docs.length} concert doc(s) to update.`)

  if (dryRun) {
    docs.forEach((doc) => {
      const hasLegacyTicketLink = !!doc.ticketLink
      const targetType = doc?.ticketing?.type || (hasLegacyTicketLink ? 'paid' : 'free')
      console.log(`Would update ${doc._id}: set ticketing.type='${targetType}'` + (hasLegacyTicketLink ? ' and migrate ticketLink -> ticketing.ticketLink' : ''))
    })
    console.log('Dry run complete. No changes applied.')
    return
  }

  let tx = client.transaction()
  docs.forEach((doc) => {
    const hasLegacyTicketLink = !!doc.ticketLink
    const targetType = doc?.ticketing?.type || (hasLegacyTicketLink ? 'paid' : 'free')

    const operations = {
      setIfMissing: {ticketing: {}},
      set: {'ticketing.type': targetType},
    }

    if (hasLegacyTicketLink && (!doc.ticketing || !doc.ticketing.ticketLink)) {
      operations.set['ticketing.ticketLink'] = doc.ticketLink
      operations.unset = ['ticketLink']
    }

    tx = tx.patch(doc._id, operations)
  })

  const result = await tx.commit({autoGenerateArrayKeys: true})
  console.log(`Migration complete. Updated ${result?.results?.length || 0} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
