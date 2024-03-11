const AdminAddress = () => <></>
export default AdminAddress

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            permanent: false,
            destination: '/dashboard/admin/address/country'
        }
    }
}

