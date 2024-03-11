const Setting = () => <></>

export default Setting;

export const getServerSideProps = () => {
    return {
        redirect: {
            permanent: false,
            destination: '/dashboard/setting/manageUsers'
        }
    }
}
