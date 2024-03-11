import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

function Emails() {
  return (
    <div className="contactFooter mx-auto">
      <div>
        <div className="mx-auto fs-6">
          <p>
            <span className="p-1 rounded-5 me-3">
              <LocalPostOfficeIcon color="white" sx={{ fontSize: 18 }} />
            </span>
            info@safqapay.com <br/>
            <span className="p-1 rounded-5 me-3">
              <LocalPostOfficeIcon color="white" sx={{ fontSize: 18 }} />
            </span>
            support@safqapay.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Emails;
