const quickInvoices = () => <></>
export default quickInvoices

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            permanent: false,
            destination: '/dashboard/invoices'
        }
    }
}

