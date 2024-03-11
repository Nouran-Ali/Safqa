const AccountApproval = ({ is_approved }) => {
    return (
        <>
            {
                is_approved ?
                    (
                        <div className='d-flex Account_approval'>
                            <img src='/logo.png' width={"40px"} alt="approved" />
                            <div className='fs-6 ms-3'>
                                <p>
                                    <span className='text-dark fw-semibold d-block'>Your account has been approved </span>
                                    <span className='safqa-text-secondary-dashboard'>07/09/2022 06:06 PM</span>
                                </p>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='d-flex Account_approval'>
                            <img src='/logo.png' width={"40px"} alt="not approved" />
                            <div className='fs-6 ms-3'>
                                <p>
                                    <span className='text-dark fw-semibold d-block'>The identity must be documented first in order to be able to perform any
                                        operation on the system</span>
                                    <span className='safqa-text-secondary-dashboard'>07/09/2022 06:06 PM</span>
                                </p>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default AccountApproval
