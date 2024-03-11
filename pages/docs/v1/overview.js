import React from 'react'

export default function Overview() {
  return (
    <div>overview</div>
  )
}

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            permanent: false,
            destination: '/docs/v1'
        }
    }
}
