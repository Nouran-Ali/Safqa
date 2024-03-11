const AdminInvoice = () => <></>
export default AdminInvoice

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            permanent: false,
            destination: '/dashboard/admin/invoice/recurringInterval'
        }
    }
}

