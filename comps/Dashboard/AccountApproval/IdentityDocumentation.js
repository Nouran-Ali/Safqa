import { Collapse } from 'antd';
import DocumentationID from './DocumentationID';
import { SaveBtn } from '../../Buttons';
const { Panel } = Collapse;

const IdentityDocumentation = () => {
    return (
        <div className="fs-5 identity_documentation">
            <div className='text-dark'>
                <h3 className='text-dark'>Identity documentation</h3>
                <hr />
                <p className='mt-4'>Your identity can be verified through one of these methods</p>
            </div>
            <div>
                <Collapse defaultActiveKey={['1']} ghost className='fs-5 w-75'>
                    <Panel
                        header={
                            <p className="m-0">
                                <img src="/identity/document_id.png" width="35px" alt="document_id" />
                                <span className="mx-2">
                                    Documentation through the ID
                                </span>
                            </p>
                        }
                        key="1">
                        <DocumentationID />
                    </Panel>
                    <Panel
                        header={
                            <p className="m-0">
                                <img src="/identity/document_passport.png" width="35px" alt="document_passport" />
                                <span className="mx-2">
                                    Documentation through the passport
                                </span>
                            </p>
                        }
                        key="2">
                    </Panel>
                    <Panel
                        header={
                            <p className="m-0">
                                <img src="/identity/document_license.png" width="35px" alt="document_license" />
                                <span className="mx-2">
                                    Documentation through driving license
                                </span>
                            </p>
                        }
                        key="3">
                    </Panel>
                </Collapse>
            </div>

            <SaveBtn />

        </div>
    )
}

export default IdentityDocumentation
