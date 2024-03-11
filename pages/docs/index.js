export default function Document() {
  return (
    <div></div>
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
