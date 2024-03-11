import React from 'react'
import { LinkHierarchy, MainTitleNew } from '../../../../comps/docs/v1/DocsV1Components';
import styles from "../../../../styles/docs/v1.module.css";

const API_URL = () => {
    return (
        <>
            <div className={`fs-5 text-dark ${styles.API_URL}`}>
                <MainTitleNew title="API URL" />
                <hr />
                <p>API Demo URL:</p>
                <button className='px-5 btn border text-start fs-4 py-3'>Safqa UI</button>
            </div>
        </>
    )
}

export default API_URL