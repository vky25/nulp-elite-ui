import ReactDOM from "react-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import image from "../../assets/bg.png";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";



const Otp = () => {
const { t } = useTranslation();

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <Box my={4}>
          <img src={require("../../assets/logo.png")} alt="Logo" />
        </Box>
        <Typography style={{fontWeight:'600',fontSize:'16px',marginBottom:'40px'}}>{t('RESET_PASSWORD')}</Typography>

        <Alert severity="info" style={{textAlign:'left'}}>{t('PLEASE_ENTER_THE_VERFICATION_CODE_RECEIVED')}</Alert>
        <Typography style={{fontWeight:'400',fontSize:'12px',textAlign:'left',margin:'35px 0 10px 0'}}>{t('VERIFICATION_CODE')}</Typography>

        <Box sx={{display:'flex',justifyContent:'space-around'}}>
        <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
            <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
            <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
            <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
            <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
            <div className="base-Input-root">
            <input className="base-Input-input" />
            </div>
        </Box>
        <Link href="" style={{textAlign:'right',fontSize:'10px',display:'block',marginTop:'10px'}}>{t('RESEND_CODE')}</Link>
        <Box pt={4}>
          <Button
            style={{
              background: "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 71px",
              fontWeight: "600",
              fontSize: "14px",
              margin:'20px 0 20px 0'
            }}
          >
            {t('SUBMIT')}
          </Button>
        </Box>
        <Box py={1}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            {t('DONT_HAVE_AN_ACCOUNT')} <Link href="">{t('REGISTER_HERE')}</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Otp;
