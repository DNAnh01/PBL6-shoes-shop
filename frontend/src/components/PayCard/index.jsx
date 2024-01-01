import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import Complete from './Complete';

const steps = ['Add Delevery Address', 'Order Summary', 'Payment', 'Compelete'];

export default function PayCard() {
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const querySearch = new URLSearchParams(location.search);

    const step = parseInt(querySearch.get('step'));

    const handleBack = () => {
        const prevStep = Math.max(step - 1, 1);
        setActiveStep(prevStep);
        navigate(`/pay?step=${prevStep}`);
    };
    const handleFinish = () => {
        toast.success('Transaction completed!');
        setTimeout(() => {
            navigate('/');
        }, 500); // 1000 milliseconds = 1 second
    };

    return (
        <div className="pay container-layout">
            <h1 className="pay-title">Check Out</h1>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step - 1} style={{ fontSize: '18px', color: 'red' }}>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you are finished
                            <Button onClick={handleFinish}>Go to Home</Button>
                            <ToastContainer />
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                style={{ fontSize: '14px' }}
                            ></Button>

                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                        <div className="mt-30">
                            {step === 1 ? (
                                <DeliveryAddressForm />
                            ) : step === 2 ? (
                                <OrderSummary />
                            ) : step === 3 ? (
                                <Payment />
                            ) : (
                                <Complete />
                            )}
                        </div>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}
