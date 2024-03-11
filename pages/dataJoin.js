import { useEffect, useState } from "react";

function DataJoin() {

    const [companyInformation, setcompanyInformation] = useState([]);

    const url = "";

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((companyInformation) => setcompanyInformation(companyInformation));
    }, []);

    return (
        <div>
            <div className="container my-4">
                <table id="example" className="table w-100 table">
                    <thead>
                        <tr>
                            <th>Nationality</th>
                            <th>bankName</th>
                            <th>confirmPassword</th>
                            <th>Department</th>
                            <th>email</th>
                            <th>managerName</th>
                            <th>password</th>
                            <th>phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyInformation.length > 0
                            ? companyInformation.map((companyInformation) => (
                                <tr key={companyInformation.Nationality}>
                                    <td>{companyInformation.bankName}</td>
                                    <td>{companyInformation.confirmPassword}</td>
                                    <td>{companyInformation.email}</td>
                                    <td>{companyInformation.managerName}</td>
                                    <td>{companyInformation.password}</td>
                                    <td>{companyInformation.phone}</td>
                                </tr>
                            ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataJoin